from rest_framework import serializers
from user import models
from django.contrib.auth import get_user_model, authenticate

class UserProfileSerializer(serializers.ModelSerializer):
    """For user profile object"""
    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'name', 'password', 'college_name', 'profile_pic')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'},
                'min_length': 5
            }
        }

    def create(self, validated_data):
        """Create and return a new user (overrides inbuilt create function)"""
        user = get_user_model().objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            college_name=validated_data['college_name'],
        )
        return user
    
class AuthTokenSerializer(serializers.Serializer):
    """Serializer for user auth token"""
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password,
        )
        if not user:
            msg = {'Unable to authenticate with provided credentials'}
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user
        return attrs