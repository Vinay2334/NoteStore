import os
from rest_framework import serializers
from comments.serializers import CommentSerializer
from user.helpers import ImageResize
from user.models import Course, Note, Comment, Tag, Subject
from django.db.models import Avg
from upload.s3Uploader import upload_to_s3_with_progress
from .helpers import PDFHashPath


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tags."""

    class Meta:
        model = Tag
        fields = ['id', 'name']
        read_only_fields = ['id']


class SubjectSerializer(serializers.ModelSerializer):
    """Serializer for Subjects"""

    class Meta:
        model = Subject
        fields = ['id', 'name']
        read_only_fields = ['id']


class CourseSerializer(serializers.ModelSerializer):
    """Serializer for Subjects"""

    class Meta:
        model = Course
        fields = ['id', 'name']
        read_only_fields = ['id']


class NoteSerializer(serializers.ModelSerializer):
    """Serializer for notes"""
    tags = TagSerializer(many=True, required=False)
    avg_rating = serializers.SerializerMethodField()
    upload_file = serializers.FileField(required=False)
    # subject = SubjectSerializer()

    class Meta:
        model = Note
        fields = [
            'id',
            'title',
            'thumbnail',
            'file_url',
            'upload_file',
            'subject',
            'course',
            'category',
            'file_size',
            'contributor',
            'date_created',
            'likes_count',
            'avg_rating',
            'tags',
        ]
        read_only_fields = [
            'id',
            'user',
            'contributor',
            'date_created',
            'likes_count',
            'file_size',
            'file_url',
        ]

    def _get_or_create_tags(self, tags, note):
        """Handle getting or creating tags as needed"""
        auth_user = self.context['request'].user  # get the authenticated user
        # Loop through tags and create one if it is not already present
        for tag in tags:
            tag_obj, created = Tag.objects.get_or_create(
                user=auth_user,
                **tag,  # Send all the details of the tag without doing name=tag
            )
            note.tags.add(tag_obj)

    def create(self, validated_data):
        """Create a note"""
        upload_file = validated_data.pop('upload_file', None)
        bucket_name = os.environ.get('AWS_STORAGE_BUCKET_NAME')
        user_channel = f"user_{validated_data['user'].id}"
        # Upload to S3 with progress
        if upload_file:
            object_name = PDFHashPath(validated_data['user'], upload_file.name)
            validated_data['file_url'] = upload_to_s3_with_progress(
                upload_file, bucket_name, object_name, user_channel)
        tags = validated_data.pop('tags', [])
        thumbnail = validated_data.get('thumbnail')
        if thumbnail:
            try:
                validated_data['thumbnail'] = ImageResize(
                    thumbnail, size=(1000, 1000))
            except Exception as e:
                print('thumbnail resize error', e)
                raise serializers.ValidationError({'error': str(e)})
       # Calculating size of the uploaded file
        # pdf_file = validated_data.get('url')
        if upload_file:
            size_bytes = upload_file.size/(1024*1024)
            validated_data['file_size'] = size_bytes
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

    def get_avg_rating(self, obj):
        # Calculate avg rating for a note using Django aggregation and get the result in a dictionary with key as rating__avg
        avg_rating = Comment.objects.filter(
            note=obj).aggregate(Avg('rating'))['rating__avg']
        # Return 0 if there are no comments
        return round(avg_rating, 2) if avg_rating is not None else 0.0


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
