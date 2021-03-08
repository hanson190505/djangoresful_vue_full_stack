from django.contrib.auth.models import User, AnonymousUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from user.serializer import CreateUserSerializer, ListUserSerializer, MyTokenObtainPairSerializer
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenViewBase


class UserView(generics.ListAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ListUserSerializer


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self, *args, **kwargs):
        print(self.request.user)
        anonymous = self.request.user
        if anonymous:
            print(123)
            return CreateUserSerializer
        return ListUserSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    """
    自定义得到token username: 账号或者密码 password: 密码或者验证码
    """
    serializer_class = MyTokenObtainPairSerializer


class MyTokenRefreshView(TokenViewBase):
    """
    自定义刷新token refresh: 刷新token的元素
    """
    serializer_class = TokenRefreshSerializer








