from django.contrib import admin
from orders.models import Orders, OrderTasks

# Register your models here.
admin.site.register(Orders)
admin.site.register(OrderTasks)