from rest_framework import serializers
from user.models import Comment
from django.core.files.storage import default_storage

class CommentSerializer(serializers.ModelSerializer):
    """Serializer for the comments on the post"""
    user_detail = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'message', 'created_at', 'updated_at', 'parent', 'note', 'user_detail', 'rating']
        read_only_fields = ['id', 'created_at', 'updated_at',]

    def validate(self, attrs):
        parent = attrs.get('parent', None)
        note = attrs.get('note', '')
        rating = attrs.get('rating', None)
        if not parent and not rating:
            raise serializers.ValidationError('Please provide the rating too')
        if parent and rating:
            raise serializers.ValidationError('Rating can not be provided by nested comment')
        if parent and not Comment.objects.filter(id=parent.id, note_id=note.id).exists():
            raise serializers.ValidationError('Parent and child note do not match')
        return attrs

    def get_user_detail(self, obj):
        # Get the user who made the comment
        user_detail = {
            'name': obj.user.name,
            'id': obj.user.id,
            'profile_pic': default_storage.url(str(obj.user.profile_pic))
        }
        return user_detail