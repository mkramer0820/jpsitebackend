from rest_framework import serializers
from orders.models import Orders, OrderTasks, OrderExpense
from factory.models import Factory
from customer.models import Customer
from factory.serializers import FactoryListSerializer
from customer.serializers import CustomerSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from dateutil import parser
import six
from rest_framework.fields import ChoiceField
from rest_framework import serializers

class OrderDeleteSerializer(serializers.ModelSerializer):

    class meta:

        model = Orders
        fields = '__all__'

class OrderExpenseSerializer(serializers.ModelSerializer):

    expenseItems = serializers.JSONField

    class Meta:
        model = OrderExpense
        fields = '__all__'

class OrderTaskSerializer(serializers.ModelSerializer):


    tasks = serializers.JSONField


    class Meta:
        model = OrderTasks
        fields = '__all__'

class OrderlistSerializer(serializers.ModelSerializer):


    buyer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), read_only=False, required=False, allow_null=False)
    factory = serializers.PrimaryKeyRelatedField(queryset=Factory.objects.all(), required=False, allow_null=True)
    buyer_name = serializers.ReadOnlyField(source='buyer.name')
    factory_name = serializers.ReadOnlyField(source='factory.name')
    tasks = serializers.SerializerMethodField()
    due_date = serializers.DateTimeField(required=False)
    factory_ship_date = serializers.DateTimeField(required=False)
    sweater_image = serializers.ImageField(required=False)
    factory_set = serializers.SerializerMethodField()
    customer_set = serializers.SerializerMethodField()
    orderExpense = serializers.SerializerMethodField()
    completeTasks = serializers.SerializerMethodField()
    incompleteTasks = serializers.SerializerMethodField()

    class Meta:
        model = Orders
        fields = '__all__'
        depth = 2

    def create(self, validated_data):
        return Orders.objects.create(**validated_data)

    def get_tasks(self, obj):

        qs = obj.ordertasks_set.all()
        return OrderTaskSerializer(qs, many=True, read_only=True).data

    def get_orderExpense(self, obj):
        qs = OrderExpense.objects.filter(order_id=obj.id).values();
        qs = OrderExpenseSerializer(qs, many=True, read_only=True).data
        return qs


    def get_factory_set(self, obj):
        try:
            qs = Factory.objects.filter(id=obj.factory.id).values()
            return qs
        except AttributeError:
            qs = ''
            return qs
    def get_customer_set(self, obj):
        try:
            qs = Customer.objects.filter(id=obj.buyer.id).values()
            return qs
        except AttributeError:
            qs = ''
            return qs
    def get_completeTasks(self, obj):
        try:
            qs = obj.ordertasks_set.complete()
            return OrderTaskSerializer(qs, many=True, read_only=True).data
        except Exception as e:
            qs = 'fail'
            return qs

    def get_incompleteTasks(self, obj):
        try:
            qs = obj.ordertasks_set.incomplete()
            return OrderTaskSerializer(qs, many=True, read_only=True).data
        except Exception as e:
            qs = 'fail'
            return qs

class TaskDashBoardSerializer(serializers.ModelSerializer):

    orders = OrderlistSerializer
    buyer_style_number = serializers.ReadOnlyField(source='order.buyer_style_number')
    jp_style_number = serializers.ReadOnlyField(source='order.jp_style_number')
    jp_style_number = serializers.ReadOnlyField(source='order.jp_style_number')
    brand = serializers.ReadOnlyField(source='order.brand')
    order_target_date = serializers.ReadOnlyField(source='order.due_date')
   # time_between_target = serializers.SerializerMethodField()


    class Meta:
        model = OrderTasks
        fields = '__all__'

"""        
        return OrderTaskSerializer(qs, many=True, read_only=True).data

        Orders = Orders.objects.all()
        target = self.order_target_date

        for todo in obj.todos:
            date = parser(todo['duedate'])
            time_between_date = target - date

            return time_between_date
"""



