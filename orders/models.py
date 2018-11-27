from django.db import models
from django.contrib.postgres.fields import JSONField, ArrayField
import os
from django.conf import settings
# Create your models here.

max_dig = 10000000
max_len = 64





class Orders(models.Model):
    isActive = models.BooleanField(default=True)
    buyer = models.ForeignKey('customer.Customer', name="buyer", blank=True, on_delete=models.SET_NULL, null=True)
    customer_order_number = models.CharField("Buyer Order Number", max_length=100, blank=True, null=True)
    buyer_style_number = models.CharField("Buyer Style Number",
                                          max_length=100, blank=True)
    jp_style_number = models.CharField("Jeanne Pierre Style Number",
                                       max_length=20, blank=True)
    jp_style_number_test = models.ManyToManyField('inventory.Inventory','+',
                                                  verbose_name='Jp Style', blank=True)
    factory = models.ForeignKey("factory.Factory", name="factory", on_delete=models.SET_NULL, null=True, blank=True)
    factory_ship_date = models.DateTimeField(verbose_name='Ship to Factory Date', blank=True, null=True)
    cost_from_factory = models.FloatField(verbose_name="Factory Cost", blank=True, null=True)
    buyers_price = models.FloatField(verbose_name='Price Buyer Paid', blank=True, null=True)
    order_type = models.CharField(choices=(('DDP', 'DDP'),
                                           ('FOB', 'FOB'),
                                           ('NA', 'NA')),
                                           null=True, verbose_name="Shipment Type", max_length=40)
    qty = models.FloatField(verbose_name='Order Qty', blank=True, null=True)
    sweater_image = models.ImageField('Item Image', blank=True, null=True, upload_to="sweater_images/")
    sweater_description = models.TextField(blank=True, verbose_name="Item Des.",
                                           max_length=200, null=True)
    brand = models.CharField(choices=(('888', 'eight eight eight'),
                                      ('JP', 'JEANNE PIERRE'),
                                      ('AVE', 'AVENUE'),
                                      ('OTHER', 'PRIVATE LABEL')),
                             verbose_name='Label', blank=True, max_length=40, null=True)
    fiber_content = models.TextField(max_length=200, verbose_name='Fiber Content Des.',
                                     blank=True, null=True)
    jp_care_instructions = models.TextField(max_length=250, blank=True,
                                            verbose_name='Care Instructions')
    color = models.CharField(max_length=75, blank=True, verbose_name='Color Des.')
    sizes = models.ManyToManyField('orders.SweaterSizes', name="Sizes", verbose_name="Sweater Sizes", blank=True,
                                   related_name='sizes')
    due_date = models.DateTimeField(blank=True, null=True)
 
    def __str__(self):
        return self.buyer_style_number

    #    def get_absolute_url(self):

    #       return reverse('orders:order_details', kwargs={'pk':self.pk})


    #def get_absolute_url(self):
    #    return reverse('orders:order_details', kwargs={'pk': self.pk})

    #def get_update_url(self):
    #    return reverse('orders:update_order', kwargs={'pk': self.pk})

    #def get_customer_options(self):
    #    customer = Customer.objects.all()
    #    name = customer.values()
    #    return name

    #def get_customer_names(self):
    #    names = Customer.objects.values('name').disctinct()
    #    return names
    def save(self, *args, **kwargs):
        return super(Orders, self).save(*args, **kwargs)


class SweaterSizes(models.Model):

    sizeType = models.CharField(name="Size", verbose_name="Size Types", max_length=30, blank=True, null=True)
    sizes = models.CharField(name="Sizing", verbose_name="Sizes", max_length=50, blank=True, null=True)

    def __str__(self):
        return self.Size


class OrderExpense(models.Model):

    order = models.ForeignKey(Orders, blank=True, on_delete=models.SET_NULL, null=True)
    totalExpense = models.FloatField(blank=True, null=True)
    expenseItems = JSONField()


class OpenTasksManager(models.Manager):

    def incomplete(self):
        return self.exclude(set_status='Complete')

    def complete(self):
        return self.filter(set_status='Complete')

    def active(self):
        return self.filter(active=True)

    def inactive(self):
        return self.filter(active=False)

    def with_due_date(self):

        all = self.all()

        for set in all:
            duedate = set.order.due_date
            return duedate



class OrderTasks(models.Model):

    isActive = models.BooleanField(default=True)
    order = models.ForeignKey(Orders, blank=True, on_delete=models.CASCADE, null=True)
    set_name = models.CharField(max_length=50, null=True, blank=True)
    todos_group = models.CharField(max_length=1000, null=True, blank=True)
    set_status = models.CharField(max_length=20, blank=True, null=True)
    todos = JSONField()
    objects = OpenTasksManager()



"In Progress, Complete,"






