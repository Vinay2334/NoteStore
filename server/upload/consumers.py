import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from urllib.parse import parse_qs

class UploadProgressConsumer(WebsocketConsumer):
    def connect(self):
        # Extract the token from the query parameters
        query_string = self.scope.get('query_string').decode()
        query_params = parse_qs(query_string)
        token = query_params.get('token', [None])[0]
        print('Token', token)
        if token:
            try:
                # Try to authenticate the user using the token
                token_obj = Token.objects.get(key=token)
                user = token_obj.user
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
