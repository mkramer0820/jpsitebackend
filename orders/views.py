
from rest_framework import generics, mixins
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from customer.models import Customer

from rest_framework import status, permissions

from collections import defaultdict

from .serializers import OrderlistSerializer, OrderlistNameSerializer, OrderFileSerializer, OrdersSerializer
from .serializers import Orders


class OrderCreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Orders.objects.all()
    serializer_class = OrderlistSerializer



class OrderCreateNamesView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Orders.objects.all()
    serializer_class = OrderlistNameSerializer



class OrderFileView(APIView):

  parser_classes = (MultiPartParser, FormParser, JSONParser)

  def post(self, request, *args, **kwargs):
    file_serializer = OrderFileSerializer(data=request.data)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

