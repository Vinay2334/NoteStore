from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import generics, authentication, permissions
from user import serializers

# Create your views here.
class UserCreateView(generics.CreateAPIView):
    """Create profiles"""
    serializer_class = serializers.UserProfileSerializer

class UserLoginApiView(ObtainAuthToken):
    """Handle creating user authentication token"""
    serializer_class = serializers.AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user."""
    serializer_class = serializers.UserProfileSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Return the authenticated user"""
        return self.request.user