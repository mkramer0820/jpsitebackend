from django.shortcuts import render

# Create your views here.

from rest_framework import generics, mixins
from inventory.serializers import InventorylistSerializer, SpecListSerializer, InventorylistCreateSerializer
from inventory.models import Spec, Inventory



class InventoryListCreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Inventory.objects.all()
    serializer_class = InventorylistCreateSerializer

class InventoryListView(generics.ListAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Inventory.objects.all()
    serializer_class = InventorylistSerializer





class SpecListCreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Spec.objects.all()
    serializer_class = SpecListSerializer


class InventoryDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Inventory.objects.all()
    serializer_class = InventorylistSerializer


class SpecDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Spec.objects.all()
    serializer_class = InventorylistSerializer
