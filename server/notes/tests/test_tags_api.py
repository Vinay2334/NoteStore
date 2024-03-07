"""
Tests for tags API
"""
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from user.models import Tag

from notes.serializers import TagSerializer

TAGS_URL = reverse('note:tag-list')

def create_user(email='example@email.com', name= 'test', password = 'test12345'):
  """Create and return a new user"""
  return get_user_model().objects.create_user(email, name, password)

class PublicTagsApiTests(TestCase):
  """Test unauthenticated Api requests."""
  def setUp(self):
    self.client = APIClient()
  def test_auth_required(self):
    """Test auth is required for retriving tags"""
    res = self.client.get(TAGS_URL)
    self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateTagsApiTests(TestCase):
  """Test authenticated Api requests."""
  def setUp(self):
    self.user=create_user()
    self.client = APIClient()
    self.client.force_authenticate(self.user)

  def test_retrieve_tags(self):
    """Test retrieving a list of tags"""
    Tag.objects.create(user=self.user, name='Tag1')
    Tag.objects.create(user=self.user, name='Tag2')
    res = self.client.get(TAGS_URL)
    tags = Tag.objects.all().order_by('-name')
    serializer = TagSerializer(tags, many=True)
    self.assertEqual(res.status_code, status.HTTP_200_OK)
    self.assertEqual(res.data, serializer.data)

  def test_tags_limited_to_user(self):
    """Test that tags returned are for the authenticated user"""
    user2 = create_user('user2@email.com', 'test', 'test12345')
    Tag.objects.create(user=user2, name='Tag2')
    tag = Tag.objects.create(user=self.user, name='New tag')
    res = self.client.get(TAGS_URL)
    self.assertEqual(res.status_code, status.HTTP_200_OK)
    self.assertEqual(len(res.data), 1)
    self.assertEqual(res.data[0]['name'], tag.name)
    self.assertEqual(res.data[0]['id'], tag.id)