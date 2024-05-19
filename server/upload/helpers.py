import hashlib
from datetime import datetime
import os

def PDFHashPath(instance, filename):
    hash_obj = hashlib.md5(instance.user.email.encode())
    # Convert datetime to string and encode it to bytes
    hash_obj.update(str(datetime.now()).encode() + filename.encode())

    hash_hex = hash_obj.hexdigest()

    base_filename = os.path.splitext(filename)[0].replace(' ', '_')

    return f'pdf/{base_filename}_{hash_hex}.pdf'
