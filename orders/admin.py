from django.contrib import admin
from orders.models import Orders, OrderTasks, OrderExpense, SweaterSizes

# Register your models here.
admin.site.register(Orders)
admin.site.register(OrderTasks)
admin.site.register(OrderExpense)
admin.site.register(SweaterSizes)