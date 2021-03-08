from django.contrib.auth.models import User, AnonymousUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from user.serializer import CreateUserSerializer, ListUserSerializer
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenViewBase
from django.contrib.auth import authenticate, login


class UserView(generics.ListAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ListUserSerializer


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        print(self.request.user)
        anonymous = self.request.user.is_anonymous
        if anonymous:
            print(123)
            return CreateUserSerializer
        return ListUserSerializer


# class LoginView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = CreateUserSerializer
#
#     def post(self, request, *args, **kwargs):
#         username = self.request.data['username']
#         password = self.request.data['password']
#         user = authenticate(request, username=username, password=password)
#
#         if user is not None:
#             return Response(status=status.HTTP_201_CREATED)
#         else:
#             return Response(status=status.HTTP_400_BAD_REQUEST)






