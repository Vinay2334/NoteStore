from rest_framework import serializers
from user.models import Note


class NoteSerializer(serializers.ModelSerializer):
    """Serializer for notes"""

    class Meta:
        model = Note
        fields = ['id', 'title', 'url', 'subject', 'category', 'contributor', 'date_created', 'likes_count']
        read_only_fields = ['id', 'user', 'contributor', 'date_created', 'likes_count']