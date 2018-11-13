
from rest_framework import generics, mixins
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from customer.models import Customer
from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import status, permissions
from rest_framework import pagination
from collections import defaultdict

"""
filters
"""
from orders.filtersets import OrdersFilter
from django_filters import rest_framework as filters

from .serializers import OrderlistSerializer, OrderTaskSerializer, TaskDashBoardSerializer
from rest_framework import generics
from metadata.metadata import MyMetaData

from .serializers import Orders, OrderTasks

class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 1
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
       return Response(data)

class OrderCreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Orders.objects.all()
    serializer_class = OrderlistSerializer
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_class = OrdersFilter
    metadata_class = MyMetaData



class OrderListFilterView (viewsets.ModelViewSet):

    __basic_fields = ('id', 'buyer', 'buyer_name')
    queryset = Orders.objects.all()
    serializer_class = OrderlistSerializer
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_fields = __basic_fields
    search_fields = __basic_fields
    pagination_class = StandardResultsSetPagination

    """
    127.0.0.1/orders/filter/ shows first 1 & 2
    127.0.0.1/orders/filter/?page=1 shows 3 & 4
    http://127.0.0.1:8000/orders/filters/?ordering=id?page=1 does page and ordering
    http://127.0.0.1:8000/orders/filters/?ordering=-id decending order
    http://127.0.0.1:8000/orders/filters/?page=2&page_size=2 page size 2, and page number
    http://127.0.0.1:8000/orders/filters/?page=1&page_size=1?ordering=factory_name
    """



class OrderTaskView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = OrderTasks.objects.all()
    serializer_class = OrderTaskSerializer


class OrderTaskRUD(generics.RetrieveUpdateDestroyAPIView):

    queryset = OrderTasks.objects.all()
    serializer_class = OrderTaskSerializer



class TaskDashBoardView(generics.ListAPIView):

    serializer_class = TaskDashBoardSerializer
    queryset = OrderTasks.objects.all()







"""
test view for orders
"""

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Orders.objects.all()
    serializer_class = OrderlistSerializer



class OrdersTest(APIView):



    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        d = []

        customers = Customer.objects.filter(isActive=True)
        customer = customers.values()
        customer = [d for d in customer]

        for d in customer:
            d['buyer'] = d['id']

        orders= Orders.objects.exclude(id=-1).values()
        orders = [d for d in orders]

        d = defaultdict(dict)
        for l in (customer, orders):
            for elem in l:
                d[elem['id']].update(elem)
        l3 = d.values()

        #for d in (customer, orders):
        #    d.append(customer)




        #buyer = [order.buyer.name for order in Orders.objects.all()]
        #order = [order.buyer_style_number for order in Orders.objects.all()]
        #factory = [order.buyer.id for order in Orders.objects.all()]
        #buyerval = buyer[0]
        #print(type(buyerval)# )
        return Response(l3)

