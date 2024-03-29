"""Test for user API"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from user import models

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')


def create_user(**params):
    """Create and return a new user"""
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
    """Test public features of the user API"""

    def setUp(self):
        self.client = APIClient()

    def test_sendotp(self):
        """Test sending OTP"""
        payload = {'email':'test@email.com'}
        send = self.client.post(reverse('user:sendotp'), payload)
        self.assertEqual(send.status_code, status.HTTP_200_OK)
        otp = models.OTP.objects.filter(email='test@email.com').first()
        self.assertIsNotNone(otp)

    def test_create_user_success(self):
        """Test creating a user is successful"""
        email = 'test@example.com'
        send = self.client.post(reverse('user:sendotp'), {'email':email})
        self.assertEqual(send.status_code, status.HTTP_200_OK)
        otp = models.OTP.objects.filter(email=email).first()
        payload = {
            'email': email,
            'password': 'testpass123',
            'confirm_password': 'testpass123',
            'name': 'Test name',
            'college_name': 'Test_college',
            'otp': otp.otp_code
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=payload['email'])
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_user_with_email_exists_error(self):
        """Test error returned if user with email exists."""
        payload = {
            'email': 'test@example.com',
            'password': 'testpass123',
            'name': 'Test name',
            'college_name': 'Test_college',
        }
        create_user(**payload)
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_password_too_short_error(self):
        """Test an error is returned if password less than 5 chars"""
        payload = {
            'email': 'test@example.com',
            'password': 'pa',
          'confirm_password': 'testpass123',
            'name': 'Test name',
            'college_name': 'Test_college',
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Generates token for valid credentials"""
        user_details = {
            'email': 'test@example.com',
            'password': 'testpassword',
            'name': 'Test name',
            'college_name': 'Test_college',
        }
        create_user(**user_details)

        payload = {
            'email': user_details['email'],
            'password': user_details['password'],
        }
        res = self.client.post(TOKEN_URL, payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_bad_credentials(self):
        """Test returns error if credentials invalid."""
        user_details = {
            'email': 'test@example.com',
            'password': 'real password',
            'name': 'Test name',
            'college_name': 'Test_college',
        }
        create_user(**user_details)

        payload = {'email':'test@example.com', 'password': 'unreal password'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_create_token_blank_password(self):
        """Test posting a blank password returns an error."""
        payload = {'email':'test@example.com', 'password': ' '}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_retrieve_user_unauthorized(self):
        """Test authentication required for users."""
        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    # def check_OTP_throttle(self):
    #     """Check if the OTP endpoint is throttling"""
    #     payload = {'email':'test@email.com'}
    #     send = self.client.post(reverse('user:sendotp'), payload)
    #     self.assertEqual(send.status_code, status.HTTP_200_OK)
    #     send = self.client.post(reverse('user:sendotp'), payload)
    #     self.assertEqual(send.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

class PrivateUserAPITests(TestCase):
    """Test API request that require authentication"""

    def setUp(self):
        self.user = create_user(
            email= 'test@example.com',
            password= 'testpassword',
            name= 'Test_name',
            college_name= 'Test_college',
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
    
    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged in user."""
        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual({res.data['name'], res.data['email']}, {self.user.name,self.user.email})
    
    def test_post_me_not_allowed(self):
        """Test POST is not allowed for the me endpoint"""
        res = self.client.post(ME_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def test_update_user_profile(self):
        """Test updating the user profile for the authenticated user"""
        payload = {'name': 'Updated_name', 'college_name': 'new_college', 'password': 'password', 'confirm_password': 'password'}

        res = self.client.patch(ME_URL, payload)

        # Refresh the user details
        self.user.refresh_from_db()
        self.assertEqual(self.user.name, payload['name'])
        self.assertEqual(self.user.college_name, payload['college_name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)