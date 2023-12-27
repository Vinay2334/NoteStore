from rest_framework import serializers
from user.models import Note

class NoteSerializer(serializers.ModelSerializer):
    """Serializer for notes"""

    class Meta:
        model = Note
        fields = ['id', 'user', 'title', 'url', 'subject', 'category', 'contributor', 'date_created']
        read_only_fields = ['id', 'user', 'contributor', 'date_created']

class LikeSerializer(NoteSerializer):
    class Meta:
        model= Note
        fields = ['is_liked']