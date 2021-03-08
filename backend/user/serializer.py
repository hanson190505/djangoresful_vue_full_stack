from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'is_superuser', 'is_staff', 'is_active', 'email']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    '''
    token验证
    '''
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        # data['username'] = self.user.username #这个是你的自定义返回的
        # data['user_id'] = self.user.id #这个是你的自定义返回的
        return data




