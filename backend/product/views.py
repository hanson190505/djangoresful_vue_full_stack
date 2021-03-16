from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from product.models import Category, Product, ProductTools
from product.serializer import CategorySerializer, ProductSerializer, ProductToolsSerializer
from rest_framework.viewsets import ModelViewSet

from utils.pagenation import ListPageNation


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_serializer_class(self):
        # print(self.request)
        return CategorySerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ListPageNation

    # def get_serializer_class(self):
    #     print(self.queryset.filter(image__has_key='pass'))
    #     return ProductSerializer


class ProductToolViewSet(ModelViewSet):
    queryset = ProductTools.objects.all()
    serializer_class = ProductToolsSerializer
    pagination_class = ListPageNation
