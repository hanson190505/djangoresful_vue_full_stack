from product.models import Category, Product
from product.serializer import CategorySerializer, ProductSerializer
from rest_framework.viewsets import ModelViewSet

from user.permissions import IsAuthenticated


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated,]
    serializer_class = ProductSerializer

    # def get_serializer_class(self, *args, **kwargs):
    #     print(self.request.user)
    #     anonymous = self.request.user.is_anonymous
    #     if anonymous:
    #         print(123)
    #         return ProductSerializer
    #     return ProductSerializer
