from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication, JWTTokenUserAuthentication


class IsAuthenticated(permissions.BasePermission):

    def has_permission(self, request, view):
        print(request.META.get('HTTP_AUTHORIZATION'))
        print(request.user)
        print(request.auth)
        # print(request)
        # return True
        jwt = JWTTokenUserAuthentication()
        # print(jwt.get_user(request.META.get('HTTP_AUTHORIZATION')))
        # user = jwt.get_user(request.META.get('HTTP_AUTHORIZATION'))
        # print(user)
        return True
