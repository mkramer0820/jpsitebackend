from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from six import text_type
from customer.models import Customer
from factory.models import Factory
from django.contrib.postgres.fields import JSONField

# Create your models here.
max_dig = 10000000
max_len = 64


class Orders(models.Model):
    buyer = models.ForeignKey('customer.Customer', "Buyer", verbose_name='Buyer', to_field='id', blank=True)
    customer_order_number = models.CharField("Buyer Order Number", max_length=100, blank=True)
    buyer_style_number = models.CharField("Buyer Style Number",
                                          max_length=100, blank=True)
    jp_style_number = models.CharField("Jeanne Pierre Style Number",
                                       max_length=20, blank=True)
    jp_style_number_test = models.ManyToManyField('inventory.Inventory','+',
                                                  verbose_name='Jp Style', blank=True)
    slug = models.SlugField(max_length=60, blank=True, unique=True)
    factory = models.ForeignKey("factory.Factory", "Factory", verbose_name='Factory', to_field='id', blank=True, max_length=100)
    factory_ship_date = models.DateField(verbose_name='Ship to Factory Date', blank=True, null=True)
    cost_from_factory = models.FloatField(verbose_name="Factory Cost", blank=True)
    buyers_price = models.FloatField(verbose_name='Price Buyer Paid', blank=True)
    order_type = models.CharField(choices=(('DDP', 'DDP'),
                                           ('FOB', 'FOB'),
                                           ('NA', 'NA')),
                                           null=True, verbose_name="Shipment Type", max_length=40)
    qty = models.FloatField(verbose_name='Order Qty', blank=True)
    sweater_image = models.ImageField('Item Image', blank=True, upload_to="sweater_images/")
    sweater_description = models.TextField(blank=True, verbose_name="Item Des.",
                                           max_length=200)
    brand = models.CharField(choices=(('888', 'eight eight eight'),
                                      ('JP', 'JEANNE PIERRE'),
                                      ('AVE', 'AVENUE'),
                                      ('OTHER', 'PRIVATE LABEL')),
                             verbose_name='Label', blank=True, max_length=40)
    fiber_content = models.TextField(max_length=200, verbose_name='Fiber Content Des.',
                                     blank=True)
    jp_care_instructions = models.TextField(max_length=250, blank=True,
                                            verbose_name='Care Instructions - before translation')
    color = models.CharField(max_length=75, blank=True, verbose_name='Color Des.')
    order_tasks = models.ManyToManyField('orders.OrderTasks', blank=True, null=True)
    due_date = models.DateTimeField(name="Due Date", blank=True);
    tasks = JSONField(blank=True, null=True, default=dict)

    def __str__(self):
        return self.buyer_style_number

    #    def get_absolute_url(self):

    #       return reverse('orders:order_details', kwargs={'pk':self.pk})

    def save(self, *args, **kwargs):
        slug1 = slugify(self.buyer_style_number)
        slug2 = slugify(self.buyer.name)
        slug3 = slugify(self.qty)
        slugs = slug1 + " " + slug2 + " " + "orderV " + slug3
        self.slug = slugify(slugs)
        super(Orders, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('orders:order_details', kwargs={'pk': self.pk})

    def get_update_url(self):
        return reverse('orders:update_order', kwargs={'pk': self.pk})

    def get_customer_options(self):
        customer = Customer.objects.all()
        name = customer.values()
        return name

    def get_customer_names(self):
        names = Customer.objects.values('name').disctinct()
        return names

class OrderTasks(models.Model):

    order = models.ForeignKey(Orders, on_delete='CASCADE', blank=True, null=True)
    set_name = models.CharField(max_length=50, null=True, blank=True)
    todos_group = models.CharField(max_length=1000, null=True, blank=True)
    todos = JSONField()







