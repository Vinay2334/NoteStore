from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserNoteComment

router = DefaultRouter()
router.register('manage', UserNoteComment, basename='manage_comment')

app_name = 'comment'

urlpatterns = [
    path('', include(router.urls)),
]
