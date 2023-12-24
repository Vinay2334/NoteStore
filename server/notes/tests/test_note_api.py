from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from user.models import Note

from notes.serializers import NoteSerializer

NOTE_URL = reverse('note:note-list')

def create_note(user, **params):
    """Create and return a sample note"""
    defaults = {
        'title': 'Sample note',
        'subject': 'DST',
        'category': 'notes'
    }
    defaults.update(params) #If params present use them by updating defaults

    note = Note.objects.create(user=user, **defaults)
    return note

class PublicNoteAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()
    
    # def test_auth_required(self):
    #     """Test auth is required to call API"""
    #     res = self.client.get(NOTE_URL)

    #     self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateNoteApiTest(TestCase):
    """Test authenticated API"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'user@example.com',
            'testpass123',
        )
        self.client.force_authenticate(self.user)
    
    def test_retrieve_recipes(self):
        """Test retrieveing a list of notes"""
        