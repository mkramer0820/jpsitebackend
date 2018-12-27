from rest_framework import serializers
from orders.models import Orders, OrderTasks, OrderExpense, SweaterSizes
from factory.models import Factory
from customer.models import Customer

from rest_framework.fields import ChoiceField
from rest_framework import serializers

def create_set(qs, add):
    try:
        #data = {}
        for k, v in qs[0].items():
            data[add + k] = v
        return data
    except Exception:
        return None

class SweaterSizeSerializer(serializers.ModelSerializer):

    class Meta:

        model = SweaterSizes
        fields = '__all__'


class OrderDeleteSerializer(serializers.ModelSerializer):

    class meta:

        model = Orders
        fields = '__all__'

class OrderExpenseSerializer(serializers.ModelSerializer):

    expenseItems = serializers.JSONField

    class Meta:
        model = OrderExpense
        fields = '__all__'


class OrderlistSerializer(serializers.ModelSerializer):


    buyer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), read_only=False,
                                               required=False, allow_null=True )
    factory = serializers.PrimaryKeyRelatedField(queryset=Factory.objects.all(), read_only=False,
                                                 required=False, allow_null=True)
    buyer_name = serializers.ReadOnlyField(source='buyer.name')
    factory_name = serializers.ReadOnlyField(source='factory.name')
    tasks = serializers.SerializerMethodField()
    due_date = serializers.DateTimeField(required=False)
    factory_ship_date = serializers.DateTimeField(required=False)
    sweater_image = serializers.ImageField(required=False)
    size = serializers.PrimaryKeyRelatedField(queryset=SweaterSizes.objects.all(),
                                              read_only=False,
                                              required=False, allow_null=True)
    sizing = serializers.SerializerMethodField()
    factory_set = serializers.SerializerMethodField()
    customer_set = serializers.SerializerMethodField()
    orderExpense = serializers.SerializerMethodField()
    completeTasks = serializers.SerializerMethodField()
    incompleteTasks = serializers.SerializerMethodField()

    class Meta:
        model = Orders
        exclude = ['jp_style_number_test']
        depth = 2


    def get_tasks(self, obj):

        qs = obj.ordertasks_set.all()
        return OrderTaskSerializer(qs, many=True, read_only=True).data

    def get_orderExpense(self, obj):
        qs = OrderExpense.objects.filter(order_id=obj.id).values()
        qs = OrderExpenseSerializer(qs, many=True, read_only=True).data
        return qs

    def get_size(self,obj):
        try:
            qs = SweaterSizes.objects.filter(orders=obj.id).values()
        except AttributeError:
            return None

    def get_sizing(self, obj):
        try:
            qs = SweaterSizes.objects.filter(orders=obj.id).values()
            #data = create_set(qs, 'sizing_')
            return qs
        except AttributeError:
            return None


    def get_factory_set(self, obj):
        try:
            qs = Factory.objects.filter(id=obj.factory.id).values()
            #print(qs[0])
            #data = create_set(qs, 'factory_')
            return qs
        except AttributeError:
            qs = ''
            return qs
    def get_customer_set(self, obj):
        try:
            qs = Customer.objects.filter(id=obj.buyer.id).values()
            #data = create_set(qs, 'cust_')
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


class OrderTaskSerializer(serializers.ModelSerializer):


    buyer_style_number = serializers.ReadOnlyField(source='order.buyer_style_number')
    jp_style_number = serializers.ReadOnlyField(source='order.jp_style_number')
    order_due_date = serializers.ReadOnlyField(source='order.due_date')
    buyer = serializers.ReadOnlyField(source='order.buyer.name')

    tasks = serializers.JSONField


    class Meta:
        model = OrderTasks
        fields = '__all__'


class TaskDashBoardSerializer(serializers.ModelSerializer):

    orders = OrderlistSerializer
    buyer_style_number = serializers.ReadOnlyField(source='order.buyer_style_number')
    #jp_style_number = serializers.ReadOnlyField(source='order.jp_style_number')
    order_due_date = serializers.ReadOnlyField(source='order.due_date')
    brand = serializers.ReadOnlyField(source='order.brand')
    order_target_date = serializers.ReadOnlyField(source='order.due_date')
   # time_between_target = serializers.SerializerMethodField()


    class Meta:
        model = OrderTasks
        exclude = ['jp_style_number_test']
"""        
        return OrderTaskSerializer(qs, many=True, read_only=True).data

        Orders = Orders.objects.all()
        target = self.order_target_date

        for todo in obj.todos:
            date = parser(todo['duedate'])
            time_between_date = target - date

            return time_between_date
"""

class ChartSerializer(serializers.Serializer):

    #data = serializers.SerializerMethodField()

    class Meta:

        model = Orders

    def get_data(self):

        #data = Orders.objects.value()
        return data



