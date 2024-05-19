# upload/routing.py
from django.urls import path, re_path
from . import consumers

websocket_urlpatterns = [
    # path('ws/upload_progress/', consumers.UploadProgressConsumer.as_asgi()),
    re_path(r"^ws/upload_progress/$", consumers.UploadProgressConsumer.as_asgi()),
]
