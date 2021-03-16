from django_filters import rest_framework as filters
from product.models import Category, Product, ProductTools
from product.serializer import CategorySerializer, ProductSerializer, ProductToolsSerializer
from rest_framework.viewsets import ModelViewSet
from utils.pagenation import ListPageNation
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_serializer_class(self):
        # print(self.request)
        return CategorySerializer


class ProductFilter(filters.FilterSet):
    p_number = filters.CharFilter(field_name='number', lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ['category', 'name', 'title']


class ProductViewSet(ModelViewSet, generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ListPageNation
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ('name', 'number')
    filterset_class = ProductFilter

    # def get_serializer_class(self):
    #     print(self.queryset.filter(image__has_key='pass'))
    #     return ProductSerializer


class ProductToolViewSet(ModelViewSet):
    queryset = ProductTools.objects.all()
    serializer_class = ProductToolsSerializer
    pagination_class = ListPageNation
