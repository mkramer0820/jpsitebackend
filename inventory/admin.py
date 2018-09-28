from django.contrib import admin

# Register your models here.
from inventory.models import Inventory, Spec

# Register your models here.
admin.site.register(Inventory)
admin.site.register(Spec)