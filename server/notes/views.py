from rest_framework import viewsets, status, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter, OpenApiTypes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db import transaction

from user.models import Note, UserProfile
from notes import serializers
from notes.permissions import IsOwnerOrReadOnly, IsOwner


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'title',
                OpenApiTypes.STR,
                description='Comma seperated list of title to filter'
            ),
            OpenApiParameter(
                'subject',
                OpenApiTypes.STR,
                description='Comma seperated list of subject'
            ),
            OpenApiParameter(
                'category',
                OpenApiTypes.STR,
                description='Comma seperated list of category'
            ),
        ]
    ),
)
class ListAllNotes(generics.ListAPIView):
    serializer_class = serializers.NoteSerializer
    authentication_classes = [TokenAuthentication]
    queryset = Note.objects.all()

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True, context={'request': request})
        data = serializer.data
        user = request.user
        try:
            liked_notes = user.liked_notes.values_list('id', flat=True)
            for note in data:
                note['is_liked'] = note['id'] in liked_notes
        except Exception as e:
            print('ListAllNotes like: ', e)
        return Response(data)
    
    def _params_to_list(self, qs):
        """Convert list of strings to Integer"""
        return qs.split(',')

    def get_queryset(self):
        title = self.request.query_params.get('title')
        subject = self.request.query_params.get('subject')
        category = self.request.query_params.get('category')
        queryset = self.queryset
        if title:
            queryset = queryset.filter(title__icontains=title)
        if subject:
            subject_names = self._params_to_list(subject)
            queryset = queryset.filter(subject__in=subject_names)
        if category:
            category_names = self._params_to_list(category)
            queryset = queryset.filter(category=category_names)

        return queryset.distinct()

class ToggleLikes(APIView):
    """Like functionality."""
    http_method_names = ['post']
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    @transaction.atomic()
    def post(self, request, *args, **kwargs):
        note_id = self.kwargs.get('note_id')
        user = request.user
        try:
            if Note.objects.filter(id=note_id).exists():
                note = Note.objects.get(id=note_id)
                if user.liked_notes.filter(id=note_id).exists():
                    user.liked_notes.remove(note)
                    note.likes_count -= 1
                    note.save()
                    return Response({'message': f'Like removed for Note {note_id}.'})
                else:
                    user.liked_notes.add(note)
                    note.likes_count += 1
                    note.save()
                    return Response({'message': f'Like added for Note {note_id}.'})
            else:
                return Response({'message': f'No Note with id {note_id}.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserLikeView(generics.ListAPIView):
    """User likes"""
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    serializer_class = serializers.NoteSerializer

    def get_queryset(self):
        user = self.request.user
        return user.liked_notes.all()

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class UserLimitedNotes(viewsets.ModelViewSet):
    """Manage notes Limited to the user"""
    serializer_class = serializers.NoteSerializer
    queryset = Note.objects.all()
    authentication_classes = [TokenAuthentication,] 
    permission_classes = [IsOwner]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user).order_by('-id')

    def perform_create(self, serializer):
        owner = self.request.user
        if owner:
            serializer.save(user=owner, contributor=owner.name)

class Bookmarks(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    serializer_class = serializers.NoteSerializer

    def get_queryset(self):
        user = self.request.user
        return user.bookmarks.all()
    
    def list(self, request):
        try:
            queryset = self.get_queryset()
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def create(self, request, *args, **kwargs):
        note_id = kwargs.get('note_id')
        user = request.user
        try:
            if Note.objects.filter(id=note_id).exists():
                note = Note.objects.get(id=note_id)
                if user.bookmarks.filter(id=note_id).exists():
                    user.bookmarks.remove(note)
                    return Response({'message': f'Bookmark removed for Note {note_id}.'}, status=status.HTTP_204_NO_CONTENT)
                else:
                    user.bookmarks.add(note)
                    return Response({'message': f'Bookmark added for Note {note_id}.'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': f'No Note with id {note_id}.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class RetrieveNote(generics.RetrieveAPIView):
    serializer_class = serializers.NoteDetailSerializer
    queryset = Note.objects.all()