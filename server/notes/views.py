from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter, OpenApiTypes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

import json
from user.models import Note, UserProfile
from notes import serializers
from notes.permissions import IsOwnerOrReadOnly


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
    )
)
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.NoteSerializer
    queryset = Note.objects.all()
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            self.queryset, many=True, context={'request': request})
        data = serializer.data
        user = request.user
        try:
            liked_notes = user.liked_notes.values_list('id', flat=True)
            for note in data:
                note['is_liked'] = note['id'] in liked_notes
        except:
            pass
        return Response(data)

    def _params_to_list(self, qs):
        """Convert list of strings to Integer"""
        return qs.split(',')

    def get_queryset(self):
        # print(self.request.query_params.get('subject'))
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

    def perform_create(self, serializer):
        owner = self.request.user
        if owner:
            serializer.save(user=owner, contributor=owner.name)


class ToggleLikes(APIView):
    """Like functionality"""
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        note_id = self.kwargs.get('note_id')
        user = request.user
        try:
            if Note.objects.filter(id=note_id).exists():
                note = Note.objects.get(id=note_id)
                if user.liked_notes.filter(id=note_id).exists():
                    user.liked_notes.remove(note)
                    return Response({'message': f'Like removed for Note {note_id}.'})
                else:
                    user.liked_notes.add(note)
                    return Response({'message': f'Like added for Note {note_id}.'})
            else:
                return Response({'message': f'No Note with id {note_id}.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserLikeView(APIView):
    """User likes"""
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            user_liked_notes = user.liked_notes.all()
            serializer = serializers.NoteSerializer(user_liked_notes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)