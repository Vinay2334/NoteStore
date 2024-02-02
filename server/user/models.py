from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.conf import settings
from django.core.validators import FileExtensionValidator, EmailValidator
from .helpers import ImageHashPath, PDFHashPath, ALLOWED_IMAGE_EXTENSIONS
from enum import Enum

"""All models here"""


class NoteCategory(Enum):
    NOTES = 'notes'
    EXAM_PAPERS = 'exam_papers'


class SubjectCategory(Enum):
    APPLIED_MATHEMATICS = 'Applied Mathematics'
    APPLIED_PHYSICS = 'Applied Physics'
    APPLIED_BIOLOGY = 'Applied Biology'


class Note(models.Model):
    """Note Model"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)
    contributor = models.CharField(max_length=255, blank=True)
    url = models.FileField(upload_to=PDFHashPath, max_length=200, validators=[
                           FileExtensionValidator(allowed_extensions=['pdf'])])
    subject = models.CharField(max_length=200, choices=[(
        tag.name, tag.value) for tag in SubjectCategory])
    category = category = models.CharField(
        max_length=20,
        choices=[(tag.name, tag.value) for tag in NoteCategory]
    )
    date_created = models.DateTimeField(default=timezone.now)
    likes_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    

class UserProfileManager(BaseUserManager):
    """To manage the operations related to user"""

    def create_user(self, email, name, password, college_name=None):
        if not email:
            raise ValueError('User must have an email address')

        # Convert second half of email address to lower case for standardization
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, college_name=college_name)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        # Create new superuser
        user = self.create_user(email, name, password)

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
    profile_pic = models.ImageField(upload_to=ImageHashPath, blank=True, null=True, validators=[
                                    FileExtensionValidator(allowed_extensions=ALLOWED_IMAGE_EXTENSIONS)], default='profile_pics/default.png')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    total_uploads = models.IntegerField(default=0)
    total_downloads = models.IntegerField(default=0)
    liked_notes = models.ManyToManyField(Note, related_name='likes')
    bookmarks = models.ManyToManyField(Note, through='Bookmark', related_name='bookmarked_by')


    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

class OTP(models.Model):
    email = models.EmailField(unique=True, validators=[EmailValidator])
    otp_code = models.IntegerField(null=False)
    created_at = models.DateTimeField(default=timezone.now)
    expires_at = models.DateTimeField(db_index=True)

    # def __str__(self):
    #     return str(self.otp_code)

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
