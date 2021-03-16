from product.models import Category, Product, ProductTools
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductToolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTools
        fields = "__all__"
