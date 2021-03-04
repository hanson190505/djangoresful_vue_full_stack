from django.db import models

from utils.models import MixModel


class Image(MixModel):
    url = models.CharField(max_length=1024)
    owner = models.CharField(max_length=64, null=True)
