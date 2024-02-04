from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .serializers import CommentSerializer
from .permissions import IsOwnerOrReadOnly
from user.models import Comment

class UserNoteComment(viewsets.ModelViewSet):
    """Viewset to manage the comments made by a particular user"""
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsOwnerOrReadOnly]

    def list(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return Response({"message": "Comment created successfully."}, status=status.HTTP_201_CREATED)
