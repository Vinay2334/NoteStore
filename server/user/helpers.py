import hashlib
from django.core.mail import send_mail
from django.conf import settings
# from user.models import UserProfile
import random

ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'gif', 'png', 'webp']

def ImageHashPath(instance, filename):
    hash_obj = hashlib.sha256(instance.email.encode())
    hash_obj.update(filename.encode())

    hash_hex = hash_obj.hexdigest()

    return 'profile_pics/{0}'.format(hash_hex)+'.'+filename.split('.')[-1]

def PDFHashPath(instance, filename):
    hash_obj = hashlib.md5(instance.user.email.encode())
    hash_obj.update(filename.encode())

    hash_hex = hash_obj.hexdigest()

    return f'pdfs/{format(hash_hex)}-{filename.split(".")[-2]}.pdf'

def send_otp_via_email(email):
    subject = 'Your account verification email'
    otp = random.randint(1000, 9999)
    message = f'Your otp is {otp} '
    email_from = settings.EMAIL_HOST
    send_mail(subject, message, email_from, [email])
    return otp
    