from django.db import models

# Create your models here.
from django.db import models
from django.utils.text import slugify

from django.urls import reverse


class Customer(models.Model):

    isActive = models.BooleanField(default=True)
    name = models.CharField("Company Name", "name", max_length=64, null=True)
    address1 = models.CharField("Address1", "address1", max_length=64, blank=True, null=True)
    address2 = models.CharField("Address2", "address2", max_length=64, blank=True, null=True)
    address3 = models.CharField("Address3", "address3", max_length=64, blank=True, null=True)
    city = models.CharField("City", "city", max_length=64, blank=True, null=True)
    state = models.CharField("State-Province", "state", max_length=64, blank=True, null=True)
    zipcode = models.CharField("Zip or Postal Code", max_length=10, blank=True, null=True)
    country = models.CharField("Country", "country", max_length=64, blank=True, null=True)
    email = models.CharField("Email", "email", max_length=64, blank=True, null=True)
    phone = models.CharField("Phone Number", "phone",max_length=19,  blank=True, null=True)
    extension = models.CharField("Ext.", "extension", max_length=6, blank=True, null=True)
    website = models.CharField("Website", "website", max_length=64, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdOn = models.DateTimeField("Created on", auto_now_add=True)

    #detail = CustomerDetailManager()

    def __str__(self):
        return "%s" %(self.name)

    def get_absolute_url(self):

        #return reverse('customer_detail', args=[str(self.pk)])
        return reverse('customer:customer_list', kwargs={'id':self.id})

    def get_update_url(self):

        return reverse('customer:customer_list', kwargs={'pk': self.pk})

    def get_customer_names(self):
        customers = Customer.objects.all()
        names = customers.values()
        return names








