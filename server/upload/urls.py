from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register('upload_note', views.NoteUploadView)

app_name = 'upload'
 
urlpatterns = [
    path('', include(router.urls)),
]