from django.db import models

from utils.models import MixModel


class Image(MixModel):
    alt = models.CharField(max_length=128, null=True)
    url = models.CharField(max_length=1024)
    owner = models.CharField(max_length=64, null=True)
    site = models.CharField(max_length=64, null=True)
