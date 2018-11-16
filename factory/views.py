from rest_framework import generics
#from factory.metadata import MyMetaData
from metadata.metadata import  MyMetaData

from .serializers import FactoryListSerializer
from .serializers import Factory, FactoryContactSerializer, FactoryContact


class FactoryCreateView(generics.ListCreateAPIView):

    queryset = Factory.objects.all()
    serializer_class = FactoryListSerializer
    metadata_class = MyMetaData


class FactoryDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Factory.objects.all()
    serializer_class = FactoryListSerializer
    metadata_class = MyMetaData



class FactoryContacListtCreateView(generics.ListCreateAPIView):

    queryset = FactoryContact.objects.all()
    serializer_class = FactoryContactSerializer
    metadata_class = MyMetaData



class FactoryContactDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = FactoryContact.objects.all()
    serializer_class = FactoryContactSerializer
    metadata_class = MyMetaData
