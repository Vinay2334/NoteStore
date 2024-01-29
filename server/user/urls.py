from django.urls import path
from user import views

app_name = 'user'


urlpatterns = [
    path('login/', views.UserLoginApiView.as_view(), name='token'),
    path('create/', views.UserCreateView.as_view(), name='create'),
    path('me/', views.ManageUserView.as_view(), name='me'),
    path('sendotp/', views.SendOtp.as_view(), name='sendotp'),
]
