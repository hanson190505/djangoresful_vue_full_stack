from django.db import models


class MixModel(models.Model):
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    delete_at = models.DateTimeField(null=True)
    is_delete = models.IntegerField(default=0)
    more = models.JSONField(null=True)

    class Meta:
        abstract = True
