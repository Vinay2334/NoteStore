import hashlib
from django.core.mail import send_mail
from django.conf import settings
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image
import random

ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'gif', 'png']


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


def AvatarGenerate(email):
    # return f'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed={instance.user.email}'
    return f'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed={email}'


def ImageResize(img, size=(300, 300)):
    image = Image.open(BytesIO(img.read()))
    # Check and resize the image if needed
    if image.height > size[0] or image.width > size[1]:
        image.thumbnail(size)
        resized_image_buffer = BytesIO()
        image.save(resized_image_buffer, format='PNG')
        img = ContentFile(resized_image_buffer.getvalue(), name=img.name)

    return img
