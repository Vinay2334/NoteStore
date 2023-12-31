import hashlib

ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'gif', 'png', 'webp']

def ImageHashPath(instance, filename):
    hash_obj = hashlib.sha256(instance.email.encode())
    hash_obj.update(filename.encode())

    hash_hex = hash_obj.hexdigest()

    return 'profile_pics/{0}'.format(hash_hex)+'.'+filename.split('.')[-1]

def PDFHashPath(instance, filename):
    hash_obj = hashlib.md5(instance.user.email.encode())
    hash_obj.update(filename.encode())

    print(filename.encode())

    hash_hex = hash_obj.hexdigest()

    return f'pdfs/{format(hash_hex)}-{filename.split(".")[-2]}.pdf'