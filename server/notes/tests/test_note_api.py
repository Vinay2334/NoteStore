from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from user.models import Note

from notes.serializers import NoteSerializer

NOTE_URL = reverse('note:note-list')
ALL_NOTES = reverse('note:all_notes')

def create_note(user, **params):
    """Create and return a sample note"""
    defaults = {
        'title': 'Sample note',
        'subject': 'DST',
        'category': 'notes',
        'contributor': user.name,
    }
    defaults.update(params) #If params present use them by updating defaults

    note = Note.objects.create(user=user, **defaults)
    return note

class PublicNoteAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()
    
    def test_listing_notes(self):
        """Test listing all the notes"""
        res = self.client.get(ALL_NOTES)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
    
    def test_auth_routes(self):
        """Test all the routes that require authentication"""
        manage = self.client.get(NOTE_URL)
        mylikes = self.client.get(reverse('note:user_likes'))

        self.assertEqual(manage.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(mylikes.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateNoteApiTest(TestCase):
    """Test authenticated API"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'user@example.com',
            'testuser',
            'testpass123',
        )
        self.client.force_authenticate(self.user)
    
    def test_retrieve_notes(self):
        """Test retrieving a list of notes"""
        create_note(user=self.user)
        create_note(user=self.user)

        res = self.client.get(NOTE_URL)

        notes = Note.objects.all().order_by('-id')
        serializer = NoteSerializer(notes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
    
    def test_notes_list_limited_to_user(self):
        """Test list of notes limited to a particular user"""
        other_user = get_user_model().objects.create_user(
            'other_user@example.com',
            'otheruser',
            'testpass123',
        )
        create_note(user=other_user)
        create_note(user=self.user)

        res = self.client.get(NOTE_URL)

        notes = Note.objects.filter(user = self.user)
        serializer = NoteSerializer(notes, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
        