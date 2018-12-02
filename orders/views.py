
from rest_framework.views import APIView
from rest_framework.response import Response
from customer.models import Customer
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import pagination
from collections import defaultdict
from orders.serializers import OrderExpense, OrderExpenseSerializer
from django.db.models.functions import TruncMonth
from django.db.models import Sum, Count
from django.db.models.functions import (
     ExtractDay, ExtractMonth, ExtractQuarter, ExtractWeek,
     ExtractWeekDay, ExtractYear,)


"""
filters
"""
from orders.filtersets import OrdersFilter, OrderTaskFilter
from django_filters import rest_framework as filters

from .serializers import OrderlistSerializer, OrderTaskSerializer, TaskDashBoardSerializer, OrderDeleteSerializer, \
                         SweaterSizeSerializer
from rest_framework import generics
from metadata.metadata import MyMetaData

from .serializers import Orders, OrderTasks, SweaterSizes

class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({

            'next': self.get_next_link(),
            'previous': self.get_previous_link(),

            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'angular_current_page': self.page.number - 1,
            'page': self.page.number,

            'results': data
        })


"""
http://127.0.0.1:8000/api/orders/paginator/?ordering=id&page=1&page_size=2
http://127.0.0.1:8000/api/orders/paginator/?ordering=id&buyer=&due_date_after=&due_date_before=2018-12-01&buyer_style_number=&jp_style_number=&isActive=
http://127.0.0.1:8000/api/orders/paginator/?buyer=&buyer_style_number=&due_date_after=&due_date_before=&isActive=&jp_style_number=&ordering=id&page=&page_size=
"""


class SweaterSizeCreateView(generics.ListCreateAPIView):

    queryset = SweaterSizes.objects.all()
    serializer_class = SweaterSizeSerializer
    metadata_class = MyMetaData


class OrderExpenseCreateView(generics.ListCreateAPIView):

    queryset = OrderExpense.objects.all()
    serializer_class = OrderExpenseSerializer
    metadata_class = MyMetaData


class OrderExpenseRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderExpense.objects.all()
    serializer_class = OrderExpenseSerializer
    metadata_class = MyMetaData


class OrdersDestroyView(generics.DestroyAPIView):

    queryset = Orders.objects.all()
    serializer_class = OrderDeleteSerializer

class OrderCreateView(generics.ListCreateAPIView):
   #This class defines the create behavior of our rest api.
    queryset = Orders.objects.all()
    serializer_class = OrderlistSerializer
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_class = OrdersFilter
    metadata_class = MyMetaData


class OrderListFilterView(viewsets.ModelViewSet):
   #This class defines the create behavior of our rest api.
    queryset = Orders.objects.all()
    serializer_class = OrderlistSerializer
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_class = OrdersFilter
    metadata_class = MyMetaData
    pagination_class = StandardResultsSetPagination

"""
class OrderListFilterView (viewsets.ModelViewSet):

    __basic_fields = ('id', 'buyer', 'buyer_name')
    queryset = Orders.objects.all()
    serializer_class = OrderlistSerializer
    filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_fields = __basic_fields
    search_fields = __basic_fields
    pagination_class = StandardResultsSetPagination


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
    filter_class = OrderTaskFilter




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



class OrderChartView(APIView):


    def get(self, request, format=None):
        """

        truncate to month and add to slect list
        group by month
        select the count of grouping
        # (might be redundant, haven't tested) select month and count
        :param request:
        :param format:
        :return:
        """
        orders = Orders.objects.values()


        return Response(orders)




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

