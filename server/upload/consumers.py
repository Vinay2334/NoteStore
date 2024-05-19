import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UploadProgressConsumer(WebsocketConsumer):
    def connect(self):
        # Extract the token from the headers
        headers = dict(self.scope["headers"])
        if b'authorization' in headers:
            auth_header = headers[b'authorization'].decode()
            token = auth_header.split()[1]  # Extract the token value
            try:
                # Try to authenticate the user using the token
                token_obj = Token.objects.get(key=token)
                user = token_obj.user
                # If the user is authenticated, proceed
                if user.is_authenticated:
                    self.user_channel = f"user_{user.id}"
                    async_to_sync(self.channel_layer.group_add)(
                        self.user_channel,
                        self.channel_name
                    )
                    self.accept()
                    return  # Exit the function after successful authentication
            except Token.DoesNotExist:
                pass  # Token doesn't exist or is invalid
        # If authentication fails, close the connection
        self.close()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.user_channel,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.send(text_data=json.dumps({
            'message': 'Received'
        }))

    def send_progress(self, event):
        self.send(text_data=json.dumps(event["content"]))
