import os

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from upload.routing import websocket_urlpatterns
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import re_path
from upload import consumers

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        # "websocket": AuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
        # Just HTTP for now. (We can add other protocols later.)
        # "websocket": AllowedHostsOriginValidator(
        #     AuthMiddlewareStack(
        #         URLRouter([
        #             re_path(r"^front(end)/$",
        #                     consumers.UploadProgressConsumer.as_asgi()),
        #         ])
        #     ))
        "websocket": AllowedHostsOriginValidator(AuthMiddlewareStack(URLRouter(websocket_urlpatterns))),
    }
)
