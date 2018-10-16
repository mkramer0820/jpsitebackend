from django_filters import rest_framework as filters
from orders.models import Orders, OrderTasks


class OrdersFilter(filters.FilterSet):

    buyer = filters.CharFilter(field_name='buyer__name')
    due_date = filters.DateFromToRangeFilter(field_name='due_date')

    class meta:

        model = Orders
        fields = ['id', 'buyer.name', 'buyer__name', 'factory_name', 'due_date']

"""
class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['category', 'in_stock', 'min_price', 'max_price']
        
        
        http://127.0.0.1:8000/orders/?buyer=Costco+Mexico&due_date_after=2018-09-01&due_date_before=2019-11-15&ordering=-due_date
"""