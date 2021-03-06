from django.db import models
from utils.models import MixModel
from purchase.models import Provider


class Category(MixModel):
    pid = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=64)


class Product(MixModel):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=64)
    number = models.CharField(max_length=64, unique=True)
    image = models.JSONField(null=True)
    title = models.CharField(max_length=1024, null=True)
    desc = models.CharField(max_length=3072, null=True)
    is_new = models.IntegerField(default=0)
    is_hot = models.IntegerField(default=0)
    is_product = models.IntegerField(default=0)
    stock = models.IntegerField(default=999)
    stock_warning = models.IntegerField(default=10)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True)
    brand = models.CharField(max_length=64, null=True)
    color = models.JSONField(null=True)
    material = models.CharField(max_length=128, null=True)
    size = models.CharField(max_length=128, null=True)
    weight = models.DecimalField(default=0, max_digits=6, decimal_places=2)
    custom_log = models.JSONField(null=True)


class ProductTools(MixModel):
    tool = models.CharField(max_length=64, null=True)

