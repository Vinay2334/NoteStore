from django.urls import path, include
from rest_framework.routers import DefaultRouter
from notes import views

router = DefaultRouter()
router.register('manage_notes', views.UserLimitedNotes)
router.register('bookmarks', views.Bookmarks, basename='bookmark')

app_name = 'note'

urlpatterns = [
    path('', include(router.urls)),
    path('all', views.ListAllNotes.as_view(), name='all_notes'),
    path('like/<str:note_id>', views.ToggleLikes.as_view(), name='toggle_likes'),
    path('mylikes/', views.UserLikeView.as_view(), name='user_likes'),
    path('bookmarks/<str:note_id>/', views.Bookmarks.as_view({'post': 'create'}), name='create_bookmark'),
]
