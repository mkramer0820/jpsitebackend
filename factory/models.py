from django.shortcuts import render
from django.db import models
from django.utils.text import slugify
# Create your views here.
from django.urls import reverse


class FactoryContact(models.Model):

    isActive = models.BooleanField(default=True)
    first_name = models.CharField('Contact First Name', max_length=30, blank=True)
    last_name = models.CharField('Contact Last Name', 'contact_last_name', max_length=30, blank=True)
    phone = models.CharField('Phone Number', 'contact_phone_number', blank=True, max_length=30)
    email = models.EmailField('Contact Email', 'contact_email', max_length=30, blank=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.first_name

    def get_absolute_url(self):

        #return reverse('customer_detail', args=[str(self.pk)])
        return reverse('factory:factory_contact_detail', kwargs={'pk':self.id})

    def get_update_url(self):

        return reverse('factory:update_factory_contact', kwargs={'pk': self.id})


class Factory(models.Model):

    isActive = models.BooleanField(default=True)
    name = models.CharField("Company Name", "name", max_length=64)
    contact_name = models.ForeignKey("factory.FactoryContact", max_length=64, on_delete='CASCADE',
                                     null=True, blank=True, default=None)
    address1 = models.CharField("Address1", "address1", max_length=64, blank=True)
    address2 = models.CharField("Address2", "address2", max_length=64, blank=True)
    address3 = models.CharField("Address3", "address3", max_length=64, blank=True)
    city = models.CharField('City', max_length=40, blank=True, null=True)
    state = models.CharField("state", "state", max_length=64, blank=True)
    zip = models.CharField("Zip", "zip", max_length=10, blank=True)
    country = models.CharField("country", "country", max_length=64, blank=True)
    email = models.CharField(max_length=40, null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    website = models.CharField("Website", max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdOn = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['contact_name', 'name', 'address1']


    def get_absolute_url(self):

        #return reverse('customer_detail', args=[str(self.pk)])
        return reverse('factory:factory_detail', kwargs={'pk':self.pk})

    def get_update_url(self):

        return reverse('factory:update_factory', kwargs={'pk': self.pk})