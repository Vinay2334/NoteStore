from rest_framework import serializers
from user import models

class UserProfileSerializer(serializers.ModelSerializer):
    """For user profile object"""
    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'name', 'password', 'college_name', 'profile_pic')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return a new user (overrides inbuilt create function)"""
        user = models.UserProfile.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            college_name=validated_data['college_name'],
        )
        return user