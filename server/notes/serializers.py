from rest_framework import serializers
from comments.serializers import CommentSerializer
from user.models import Note, Comment


class NoteSerializer(serializers.ModelSerializer):
    """Serializer for notes"""

    class Meta:
        model = Note
        fields = ['id', 'title', 'url', 'subject', 'category', 'contributor', 'date_created', 'likes_count',]
        read_only_fields = ['id', 'user', 'contributor', 'date_created', 'likes_count',]
    
    
class NoteDetailSerializer(NoteSerializer):
    """Serializer to get details of a single Note"""
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = NoteSerializer.Meta.fields + ['comments']

    def get_comments(self, obj):
        # Get comments for the Notes
        comments = Comment.objects.filter(note=obj)
        return CommentSerializer(comments, many=True).data