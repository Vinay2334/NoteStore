from django.urls import path
from user import views

app_name = 'user'


urlpatterns = [
    path('login/', views.UserLoginApiView.as_view(), name='token'),
    path('create/', views.UserCreateView.as_view(), name='create'),
]
