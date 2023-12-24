from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter, OpenApiTypes
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from user.models import Note
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
        if self.request.user:
            serializer.save(user=self.request.user)