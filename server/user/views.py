from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, authentication, permissions, status
from user import serializers
from user.models import OTP

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
    
class SendOtp(generics.CreateAPIView):
    """Send OTP when registering"""
    serializer_class = serializers.OTPSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        
        try:
            otp_instance = OTP.objects.get(email=email)
            serializer = self.get_serializer(instance=otp_instance, data=request.data)
        except OTP.DoesNotExist:
            serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)