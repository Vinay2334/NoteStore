from rest_framework import status, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import generics
from user import serializers, models, permissions

# Create your views here.
class UserCreateView(generics.CreateAPIView):
    """Create profiles"""
    serializer_class = serializers.UserProfileSerializer

class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication token"""
    serializer_class = serializers.AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES