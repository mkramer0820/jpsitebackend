from rest_framework import generics

from .serializers import FactoryListSerializer
from .serializers import Factory, FactoryContactSerializer, FactoryContact


class FactoryCreateView(generics.ListCreateAPIView):

    queryset = Factory.objects.all()
    serializer_class = FactoryListSerializer


class FactoryDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Factory.objects.all()
    serializer_class = FactoryListSerializer


class FactoryContacListtCreateView(generics.ListCreateAPIView):

    queryset = FactoryContact.objects.all()
    serializer_class = FactoryContactSerializer


class FactoryContactDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = FactoryContact.objects.all()
    serializer_class = FactoryContactSerializer