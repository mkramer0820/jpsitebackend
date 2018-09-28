from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .serializers import CustomerSerializer
from .serializers import Customer


class CustomerCreateView(generics.ListCreateAPIView):

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer