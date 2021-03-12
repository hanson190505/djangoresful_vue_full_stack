from rest_framework.permissions import IsAuthenticated

from product.models import Category, Product
from product.serializer import CategorySerializer, ProductSerializer
from rest_framework.viewsets import ModelViewSet


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    # permission_classes = [IsAuthenticated,]
    serializer_class = ProductSerializer
    # pagination_class =

    def get_serializer_class(self):
        print(self.queryset.filter(image__has_key='pass'))
        return ProductSerializer
