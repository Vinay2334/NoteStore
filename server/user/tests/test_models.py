from django.test import TestCase
from django.contrib.auth import get_user_model
from user import models

class ModeltTests(TestCase):
    """Test models."""
    
    def test_create_user_with_email_successful(self):
        """Test creating a user with an email is successful"""
        email = 'test@example.com'
        name = 'test'
        password = 'testpass123'
        user = get_user_model().objects.create_user(
            email=email,
            name=name,
            password=password,
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
    
    def test_create_note(self):
        """Test creating a note is successfull"""
        user = get_user_model().objects.create_user(
            'test@example.com',
            'test',
            'testpass123',
        )
        note = models.Note.objects.create(
            user=user,
            title='Sample note',
            subject='Applied Mathematics',
            category='notes',
        )
        self.assertEqual(str(note), note.title)

    def test_create_otp(self):
        """Testing creating otp is successful"""
        otp = models.OTP.objects.create(
            email='Test@email.com',
            otp_code=1234,
        )
        self.assertEqual(otp.otp_code, otp.otp_code)