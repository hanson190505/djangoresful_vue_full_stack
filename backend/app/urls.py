"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from product.views import CategoryViewSet, ProductViewSet
from rest_framework import routers

from purchase.views import ProviderViewSet
from upload.views import UploadFile, ImageViewSet
from user.views import UserView, UserRegisterView, UserViewSet, MyTokenObtainPairView, MyTokenRefreshView

router = routers.DefaultRouter()
router.register('category', CategoryViewSet)
router.register('product', ProductViewSet)
router.register('image', ImageViewSet)
router.register('user', UserViewSet)
router.register('provider', ProviderViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/upload', UploadFile.as_view(), name='upload'),
    # path('api/v1/login/', LoginView.as_view(), name='login'),
    path('api/v1/register/', UserRegisterView.as_view(), name='register'),
    # path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/v1/token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
]
