# import os
# import sys
# import threading

import boto3
from botocore.client import Config
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync

import os
import sys
import threading
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class ProgressPercentage(object):
    def __init__(self, file, filename, user_channel):
        self._file = file
        self._filename = filename
        self._size = float(file.size)
        self._seen_so_far = 0
        self._lock = threading.Lock()
        self._user_channel = user_channel

    def __call__(self, bytes_amount):
        with self._lock:
            self._seen_so_far += bytes_amount
            percentage = (self._seen_so_far / self._size) * 100
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                self._user_channel,
                {
                    "type": "send_progress",
                    "content": {
                        "filename": self._filename,
                        "percentage": percentage,
                    }
                }
            )
            sys.stdout.write(
                "\r%s  %s / %s  (%.2f%%)" % (
                    self._filename, self._seen_so_far, self._size,
                    percentage))
            sys.stdout.flush()

def upload_to_s3_with_progress(file, bucket_name, object_name, user_channel):
    s3 = boto3.client('s3', config=Config(s3={'addressing_style': 'path'}))

    s3.upload_fileobj(
        file,
        bucket_name,
        object_name,
        Callback=ProgressPercentage(file, file.name, user_channel)
    )

    return f"https://{bucket_name}.s3.amazonaws.com/{object_name}"



# def upload_to_s3_with_progress(file, bucket_name, object_name, user_channel):
#     s3 = boto3.client('s3', config=Config(s3={'addressing_style': 'path'}))

#     def progress_callback(bytes_transferred):
#         channel_layer = get_channel_layer()
#         async_to_sync(channel_layer.group_send)(
#             user_channel, 
#             {
#                 'type': 'send_progress',
#                 'content': {'progress': bytes_transferred}
#             }
#         )

#     s3.upload_fileobj(
#         file,
#         bucket_name,
#         object_name,
#         Callback=ProgressPercentage
#     )

#     return f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
