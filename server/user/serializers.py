from rest_framework import serializers
from user import models
from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone
from .helpers import send_otp_via_email, ImageResize
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile


class UserProfileSerializer(serializers.ModelSerializer):
    """For user profile object"""
    otp = serializers.IntegerField(write_only=True)
    total_uploads = serializers.SerializerMethodField()

    class Meta:
        model = models.UserProfile
        fields = ['id', 'email', 'name', 'password',
                  'college_name', 'profile_pic', 'otp', 'total_uploads']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'},
                'min_length': 5
            }
        }

    def get_total_uploads(self, obj):
        notes_count = models.Note.objects.filter(user=obj).count()
        return notes_count

    def create(self, validated_data):
        """Create and return a new user (overrides inbuilt create function)"""
        otp = validated_data.pop('otp', None)
        profile_pic = validated_data.get('profile_pic', None)
        generated_otp = models.OTP.objects.filter(
            email=validated_data['email']).first()

        if profile_pic:
            try:
                profile_pic = ImageResize(profile_pic)
            except Exception as e:
                raise serializers.ValidationError({'error': e})

        # Check for OTP validation
        if not generated_otp or otp != generated_otp.otp_code:
            raise serializers.ValidationError({'error': 'Invalid OTP'})
        if generated_otp.is_expired():
            raise serializers.ValidationError(
                {'error': 'OTP expired. Please generate another OTP'})

        user = get_user_model().objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            profile_pic=profile_pic,
            college_name=validated_data['college_name'],
        )
        return user

    def update(self, instance, validated_data):
        """Update and return user."""
        # Email verification
        email = validated_data.get('email', None)
        otp = validated_data.get('otp', None)
        if email and otp:
            generated_otp = models.OTP.objects.filter(
                email=validated_data['email']).first()
            if not generated_otp:
                raise serializers.ValidationError(
                    {'error': 'OTP not generated'})
            if generated_otp != otp:
                raise serializers.ValidationError(
                    {'error': 'OTP does not match'})
        elif email:
            raise serializers.ValidationError({'error': 'OTP not provided'})

        password = validated_data.pop('password', None)
        profile_pic = validated_data.get('profile_pic', None)

        if profile_pic:
            try:
                validated_data['profile_pic'] = ImageResize(profile_pic)
            except Exception as e:
                raise serializers.ValidationError({'error': e})

        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()

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


class OTPSerializer(serializers.Serializer):
    """For OTP"""
    email = serializers.EmailField()

    class Meta:
        fields = ('id', 'email', 'otp_code', 'created_at', 'expires_at',)
        write_only_fields = ('email',)

    def create(self, validated_data):
        """Create an OTP"""
        otp = send_otp_via_email(validated_data['email'])
        email = validated_data['email']
        return models.OTP.objects.create(email=email, otp_code=otp)

    def update(self, instance, validated_data):
        """Update the OTP if already present"""
        otp = send_otp_via_email(validated_data['email'])
        instance.otp_code = otp
        instance.created_at = timezone.now()
        instance.save()
        return instance
