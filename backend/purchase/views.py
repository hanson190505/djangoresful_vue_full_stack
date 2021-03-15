from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from purchase.models import Provider
from purchase.serializer import ProviderSerializer


class ProviderViewSet(ModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer

