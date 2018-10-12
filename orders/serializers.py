from rest_framework import serializers
from orders.models import Orders, OrderTasks
from factory.models import Factory
from customer.models import Customer
from customer.serializers import CustomerSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status



class OrderlistSerializer(serializers.ModelSerializer):


    buyer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    factory = serializers.PrimaryKeyRelatedField(queryset=Factory.objects.all())
    buyer_name = serializers.ReadOnlyField(source='buyer.name')
    factory_name = serializers.ReadOnlyField(source='factory.name')
    due_date = serializers.CharField(source='Due Date')

    class Meta:
        model = Orders
        fields = '__all__'
        #fields = ('tasks',)
        depth = 2

class OrderTaskSerializer(serializers.ModelSerializer):


    tasks = serializers.JSONField


    class Meta:
        model = OrderTasks
        fields = '__all__'




class OrderFileSerializer(serializers.ModelSerializer):

    class Meta():
        model = Orders
        fields = ('pk', 'id', 'buyer_style_number', 'sweater_image')

class OrderlistNameSerializer(serializers.ModelSerializer):

    #buyer = serializers.StringRelatedField()
    buyer = serializers.StringRelatedField()
    factory = serializers.StringRelatedField()


    class Meta:
        model = Orders
        fields = '__all__'
        #fields = ('tasks',)
        depth = 2



class OrdersSerializer(serializers.ModelSerializer):

    order = OrderlistNameSerializer
    orders2 = OrderlistSerializer

    class Meta:
        model = Orders
        fields = '__all__'