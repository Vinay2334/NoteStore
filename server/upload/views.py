from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .s3Uploader import upload_to_s3_with_progress
from user.models import Note
from notes.serializers import NoteSerializer
from rest_framework.authentication import TokenAuthentication
from .helpers import PDFHashPath

class NoteUploadView(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        try:
            file = self.request.FILES['pro_url']
            bucket_name = 'note-store'
            object_name = PDFHashPath(self.request, file.name)
            user_channel = f"user_{self.request.user.id}"

            # Upload to S3 with progress
            s3_url = upload_to_s3_with_progress(file, bucket_name, object_name, user_channel)

            # Save the note instance
            serializer.save(user=self.request.user, file_url=s3_url, contributor=self.request.user.name)
        except Exception as e:
            print(f"Error during file upload: {str(e)}")
            raise
