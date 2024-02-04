from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from user.models import Comment, Note
from django.contrib.auth import get_user_model

COMMENT_URL = reverse('comment:manage_comment-list')


def create_note(user, **params):
    """Create and return a sample note"""
    defaults = {
        'title': 'Sample note',
        'subject': 'DST',
        'category': 'notes',
        'contributor': user.name,
    }
    defaults.update(params)  # If params present use them by updating defaults

    note = Note.objects.create(user=user, **defaults)
    return note


class CommentAPIPublicTests(TestCase):
    """Test public routes"""

    def test_comment_unauthenticated(self):
        self.user = get_user_model().objects.create_user(
            'user@example.com',
            'testuser',
            'testpass123',
        )
        note = create_note(user=self.user)
        payload = {
            'message': 'test comment',
            'note': note.id,
        }
        res = self.client.post(COMMENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class CommentAPIPrivateTests(TestCase):
    """Test for Private CRUD operations in the comment api"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'user@example.com',
            'testuser',
            'testpass123',
        )
        self.client.force_authenticate(self.user)
        create_note(user=self.user)

    def test_create_comment(self):
        """ Test Creating the comment"""

        note = create_note(user=self.user)
        payload = {
            'message': 'test comment',
            'note': note.id,
        }
        res = self.client.post(COMMENT_URL, payload)
        comment = Comment.objects.filter(id=res.data['id']).first()
        self.assertEqual(res.data['id'], comment.id)

    def test_delete_comment(self):
        """ Test Deleting the comment"""

        note = create_note(user=self.user)

        payload = {'message': 'test comment', 'note': note.id}

        res1 = self.client.post(COMMENT_URL, payload)
        res2 = self.client.post(COMMENT_URL, payload)

        self.assertEqual(res1.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res2.status_code, status.HTTP_201_CREATED)

        comment_id_to_delete = res2.data['id']
        res_delete = self.client.delete(
            f'{COMMENT_URL}{comment_id_to_delete}/')

        self.assertEqual(res_delete.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(Comment.objects.filter(
            id=comment_id_to_delete).exists())

    def test_update_comment(self):
        """Test Updating the comment"""

        note = create_note(user=self.user)

        payload = {'message': 'test comment', 'note': note.id}

        res = self.client.post(COMMENT_URL, payload)

        comment_to_update = res.data['id']
        update_message = 'updated message'
        update_payload = {'message': update_message}

        res_update = self.client.patch(
            f'{COMMENT_URL}{comment_to_update}/', update_payload)
        self.assertEqual(res_update.status_code, status.HTTP_200_OK)
        self.assertEqual(Comment.objects.get(
            id=comment_to_update).message, update_message)

    def test_parent_child_noteid_same(self):
        """Test if parent and child both have the same note id"""

        note = create_note(user=self.user)
        note2 = create_note(user=self.user)
        payload = {'message': 'test comment', 'note': note.id}
        res = self.client.post(COMMENT_URL, payload)
        payload = {'message': 'test comment',
                   'note': note2.id, 'parent': res.data['id']}
        res = self.client.post(COMMENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
