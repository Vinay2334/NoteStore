from rest_framework import viewsets, status, generics, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter, OpenApiTypes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django.db import transaction

from user.models import Note, Tag, Subject
from notes import serializers
from notes.permissions import IsOwner

class ManageSubjects(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAdminUser]
  serializer_class = serializers.SubjectSerializer
  queryset = Subject.objects.all()


@extend_schema_view(get=extend_schema(parameters=[
    OpenApiParameter('title',
                     OpenApiTypes.STR,
                     description='Comma separated list of title to filter'),
    OpenApiParameter('subject',
                     OpenApiTypes.STR,
                     description='Comma separated list of subject'),
    OpenApiParameter('category',
                     OpenApiTypes.STR,
                     description='Comma separated list of category'),
    OpenApiParameter('order_by_date',
                     OpenApiTypes.STR,
                     description='order by date'),
]), )
class ListAllNotes(generics.ListAPIView):
  """List all the notes"""
  serializer_class = serializers.NoteSerializer
  authentication_classes = [TokenAuthentication]
  queryset = Note.objects.all()
  pagination_class = PageNumberPagination

  def list(self, request, *args, **kwargs):
    response = super().list(request, *args, **kwargs)
    user = request.user
    try:
      liked_notes = user.liked_notes.values_list('id', flat=True)
      for note in response.data['results']:
        note['is_liked'] = note['id'] in liked_notes
    except Exception as e:
      print('ListAllNotes like: ', e)
    return response

  def _params_to_list(self, qs):
    """Convert string to list"""
    return qs.split(',')

  def _params_to_int(self, qs):
    """Convert strings to list of int"""
    return [int(num) for num in qs.split(',')]

  def get_queryset(self):
    title = self.request.query_params.get('title')
    subject = self.request.query_params.get('subject')
    category = self.request.query_params.get('category')
    order_by_date = self.request.query_params.get('order_by_date')
    queryset = self.queryset
    if title:
      queryset = queryset.filter(title__icontains=title)
    if subject:
      subject_ids = self._params_to_int(subject)
      queryset = queryset.filter(subject__in=subject_ids)
    if category:
      category_names = self._params_to_list(category)
      queryset = queryset.filter(category__in=category_names)
    # Later
    if order_by_date == 'asc':
      queryset.order_by('date_created')
    return queryset.distinct()


class ToggleLikes(APIView):
  """Like functionality."""
  http_method_names = ['post']
  authentication_classes = [
      TokenAuthentication,
  ]
  permission_classes = [
      IsAuthenticated,
  ]

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
        return Response({'message': f'No Note with id {note_id}.'},
                        status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
      return Response({"error": str(e)},
                      status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserLikeView(generics.ListAPIView):
  """User likes"""
  authentication_classes = [
      TokenAuthentication,
  ]
  permission_classes = [
      IsAuthenticated,
  ]
  serializer_class = serializers.NoteSerializer
  pagination_class = PageNumberPagination

  def get_queryset(self):
    user = self.request.user
    return user.liked_notes.all()

  def list(self, request, *args, **kwargs):
    try:
      response = super().list(request, *args, **kwargs)
      return response
    except Exception as e:
      return Response({"UserLikeView: error": str(e)},
                      status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserLimitedNotes(viewsets.ModelViewSet):
  """Manage notes Limited to the user"""
  serializer_class = serializers.NoteSerializer
  queryset = Note.objects.all()
  authentication_classes = [
      TokenAuthentication,
  ]
  permission_classes = [IsOwner]

  def get_queryset(self):
    return self.queryset.filter(user=self.request.user).order_by('-id')

  def perform_create(self, serializer):
    owner = self.request.user
    if owner:
      serializer.save(user=owner, contributor=owner.name)

  def update(self, request, *args, **kwargs):
    # Remove 'url' from request.data before calling the parent update method
    request.data.pop('url', None)

    return super().update(request, *args, **kwargs)


class Bookmarks(viewsets.ViewSet):
  """Add or remove bookmarks"""
  authentication_classes = [
      TokenAuthentication,
  ]
  permission_classes = [
      IsAuthenticated,
  ]
  serializer_class = serializers.NoteSerializer

  def get_queryset(self):
    user = self.request.user
    return user.bookmarks.all()

  def list(self, request, *args, **kwargs):
    try:
      paginator = PageNumberPagination()
      queryset = paginator.paginate_queryset(self.get_queryset(), request)
      serializer = self.serializer_class(queryset, many=True)
      # return Response(serializer.data, status=status.HTTP_200_OK)
      return paginator.get_paginated_response(serializer.data)
    except Exception as e:
      return Response({"BookmarksView: error": str(e)},
                      status=status.HTTP_500_INTERNAL_SERVER_ERROR)

  def create(self, request, *args, **kwargs):
    note_id = kwargs.get('note_id')
    user = request.user
    try:
      if Note.objects.filter(id=note_id).exists():
        note = Note.objects.get(id=note_id)
        if user.bookmarks.filter(id=note_id).exists():
          user.bookmarks.remove(note)
          return Response({'message': f'Bookmark removed for Note {note_id}.'},
                          status=status.HTTP_204_NO_CONTENT)
        else:
          user.bookmarks.add(note)
          return Response({'message': f'Bookmark added for Note {note_id}.'},
                          status=status.HTTP_201_CREATED)
      else:
        return Response({'message': f'No Note with id {note_id}.'},
                        status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
      return Response({"error": str(e)},
                      status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveNote(generics.RetrieveAPIView):
  """Get a single note"""
  serializer_class = serializers.NoteDetailSerializer
  queryset = Note.objects.all()
  pagination_class = PageNumberPagination


class TagViewSet(mixins.DestroyModelMixin ,mixins.UpdateModelMixin ,mixins.ListModelMixin, viewsets.GenericViewSet):
  """Manage tags in the database"""
  serializer_class = serializers.TagSerializer
  queryset = Tag.objects.all()
  authentication_classes = [
      TokenAuthentication,
  ]
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    """Filter queryset to authenticated user."""
    return self.queryset.filter(user=self.request.user).order_by('-name')
  