from django.db import models
from utils.models import MixModel


class Provider(MixModel):
    """
    collaborate_level: 从1开始向高排序
    """
    full_name = models.CharField(max_length=512)
    short_name = models.CharField(max_length=64)
    CEO = models.CharField(max_length=64, null=True)
    addr = models.CharField(max_length=512, null=True)
    website = models.CharField(max_length=512, null=True)
    phone = models.CharField(max_length=128, null=True)
    collaborate_at = models.DateField(null=True)
    is_collaborate = models.IntegerField(default=1)
    collaborate_level = models.IntegerField(default=1)
    linkman = models.CharField(max_length=64, null=True)
    linkman_phone = models.CharField(max_length=128, null=True)
    linkman_email = models.CharField(max_length=128, null=True)
