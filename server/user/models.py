from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.conf import settings
from django.core.files import storage
from django.dispatch import receiver
from django.core.validators import FileExtensionValidator, EmailValidator, MaxValueValidator
from .helpers import ALLOWED_IMAGE_EXTENSIONS
from enum import Enum
import logging
"""All models here"""


class NoteCategory(Enum):
  NOTES = 'notes'
  EXAM_PAPERS = 'exam_papers'


class Subject(models.Model):
  """Subject Model"""
  sub_name = models.CharField(max_length=255)

  def __str__(self):
    return self.sub_name
  
class Course(models.Model):
  """Course Model"""
  course_name = models.CharField(max_length=255)

  def __str__(self):
    return self.course_name

class Note(models.Model):
  """Note Model"""
  user = models.ForeignKey(
      settings.AUTH_USER_MODEL,
      on_delete=models.CASCADE,
  )
  title = models.CharField(max_length=255)
  contributor = models.CharField(max_length=255, blank=True)
  thumbnail = models.ImageField(
      upload_to='thumbnails/',
      null=True,
      validators=[
          FileExtensionValidator(allowed_extensions=ALLOWED_IMAGE_EXTENSIONS)
      ])
  url = models.FileField(
      upload_to='pdf/',
      validators=[FileExtensionValidator(allowed_extensions=['pdf'])],
      null=True)
  file_size = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
  subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
  course = models.ForeignKey(Course, on_delete=models.CASCADE)
  category = category = models.CharField(max_length=20,
                                         choices=[(tag.name, tag.value)
                                                  for tag in NoteCategory])
  date_created = models.DateTimeField(default=timezone.now)
  likes_count = models.IntegerField(default=0)
  tags = models.ManyToManyField('Tag')

  def __str__(self):
    return self.title


class UserProfileManager(BaseUserManager):
  """To manage the operations related to user"""

  def create_user(self,
                  email,
                  name,
                  password,
                  college_name=None,
                  profile_pic=None):
    if not email:
      raise ValueError('User must have an email address')

    # Convert second half of email address to lower case for standardization
    email = self.normalize_email(email)
    user = self.model(email=email,
                      name=name,
                      college_name=college_name,
                      profile_pic=profile_pic)

    user.set_password(password)
    user.save(using=self._db)

    return user

  def create_superuser(self, email, name, password, profile_pic=None):
    # Create new superuser
    user = self.create_user(email, name, password, profile_pic)

    user.is_superuser = True
    user.is_staff = True
    user.save(using=self._db)

    return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
  """Mode for storing user data"""

  class Meta:
    db_table = 'user_userprofile'
    ordering = ['id']

  email = models.EmailField(unique=True, validators=[EmailValidator])
  name = models.CharField(max_length=255)
  college_name = models.CharField(max_length=255, null=True)
  profile_pic = models.ImageField(
      upload_to='avatars/',
      null=True,
      validators=[
          FileExtensionValidator(allowed_extensions=ALLOWED_IMAGE_EXTENSIONS)
      ])
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  date_joined = models.DateTimeField(default=timezone.now)
  liked_notes = models.ManyToManyField(Note, related_name='likes')
  bookmarks = models.ManyToManyField(Note,
                                     through='Bookmark',
                                     related_name='bookmarked_by')

  objects = UserProfileManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name']


class OTP(models.Model):
  email = models.EmailField(unique=True, validators=[EmailValidator])
  otp_code = models.IntegerField(null=False)
  created_at = models.DateTimeField(default=timezone.now)
  expires_at = models.DateTimeField(db_index=True)

  def __str__(self):
    return f"{self.email} - {self.otp_code}"

  def save(self, *args, **kwargs):
    # Setting expires_at at 10 minutes from created_at time
    self.expires_at = self.created_at + timezone.timedelta(minutes=10)
    super().save(*args, **kwargs)

  def is_expired(self, *args, **kwargs):
    # Check if an OTP is already expired
    return self.expires_at < timezone.now()

  @classmethod
  def delete_expired(cls):
    # Delete all expired OTPs from the database
    expired_otps = cls.objects.filter(expires_at__lt=timezone.now())
    expired_otps.delete()


class Bookmark(models.Model):
  """Bookmarks by the user"""
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  note = models.ForeignKey(Note, on_delete=models.CASCADE)
  timestamp = models.DateTimeField(default=timezone.now)


class Comment(models.Model):
  """Comments for the Notes"""
  message = models.TextField()
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField(auto_now=True)
  rating = models.IntegerField(default=0, validators=[MaxValueValidator(5)])
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  note = models.ForeignKey(Note, on_delete=models.CASCADE)
  parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)

  def __str__(self):
    return f"{self.user.name} - {self.message}"


class Tag(models.Model):
  """Tags for filtering Notes"""
  name = models.CharField(max_length=255)
  user = models.ForeignKey(
      settings.AUTH_USER_MODEL,
      on_delete=models.CASCADE,
  )

  def __str__(self):
    return self.name


@receiver(models.signals.pre_delete, sender=UserProfile)
def delete_image_on_delete(sender, instance, using, **kwargs):
  try:
    instance.profile_pic.delete(save=False)
  except Exception as e:
    logging.error(f'delete_image_on_delete error: {e}')


@receiver(models.signals.pre_save, sender=UserProfile)
def delete_image_on_change(sender, instance, using, **kwargs):
  if not instance.pk:
    return False
  try:
    old_profile_pic = UserProfile.objects.filter(pk=instance.pk).values_list(
        'profile_pic', flat=True).first()
  except UserProfile.DoesNotExist:
    return
  new_profile_pic = instance.profile_pic
  if old_profile_pic and new_profile_pic and new_profile_pic != old_profile_pic:
    storage.default_storage.delete(old_profile_pic)


@receiver(models.signals.pre_delete, sender=Note)
def delete_note_on_delete(sender, instance, using, **kwargs):
  try:
    instance.url.delete(save=False)
    instance.thumbnail.delete(save=False)
  except Exception as e:
    logging.error(f'delete_note_on_delete error: {e}')
