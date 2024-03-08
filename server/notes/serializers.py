from rest_framework import serializers
from comments.serializers import CommentSerializer
from user.models import Note, Comment, Tag


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tags."""

    class Meta:
        model = Tag
        fields = ['id', 'name']
        read_only_fields = ['id']


class NoteSerializer(serializers.ModelSerializer):
    """Serializer for notes"""
    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = Note
        fields = [
            'id',
            'title',
            'url',
            'subject',
            'category',
            'contributor',
            'date_created',
            'likes_count',
            'tags',
        ]
        read_only_fields = [
            'id',
            'user',
            'contributor',
            'date_created',
            'likes_count',
        ]
    
    def _get_or_create_tags(self, tags, note):
        """Handle getting or creating tags as needed"""
        auth_user = self.context['request'].user # get the authenticated user
        # Loop through tags and create one if it is not already present
        for tag in tags:
            tag_obj, created = Tag.objects.get_or_create(
                user=auth_user,
                **tag, # Send all the details of the tag without doing name=tag
            )
            note.tags.add(tag_obj)

    def create(self, validated_data):
        """Create a note"""
        tags = validated_data.pop('tags', [])
        note = Note.objects.create(**validated_data)
        self._get_or_create_tags(tags, note)

        return note
    
    def update(self, instance, validated_data):
        """Update note."""
        tags = validated_data.pop('tags', None)
        if tags is not None:
            instance.tags.clear()
            self._get_or_create_tags(tags, instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

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
