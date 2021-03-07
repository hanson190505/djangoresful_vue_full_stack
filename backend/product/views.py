from product.models import Category, Product
from product.serializer import CategorySerializer, ProductSerializer
from rest_framework.viewsets import ModelViewSet


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # def create(self, request, *args, **kwargs):
    #     print(request.data)
    #     return super().create(self, request, *args, **kwargs)
