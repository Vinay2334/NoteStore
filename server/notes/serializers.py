from rest_framework import serializers
from user.models import Note

class NoteSerializer(serializers.ModelSerializer):
    """Serializer for recipes"""

    class Meta:
        model = Note
        fields = ['id', 'user', 'title', 'subject', 'category', 'contributor', 'date_created']
        read_only_fields = ['id', 'user', 'contributor', 'date_created']