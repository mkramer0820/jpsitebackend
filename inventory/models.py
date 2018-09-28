from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from six import text_type
from customer.models import Customer
from factory.models import Factory



spec_choices = (
    ('American', 'American'),
    ('American plus', 'American plus'),
    ('American petite', 'American petite'),
    ('Avenue American Plus', 'Avenue American Plus'),
    ('Asian', 'Asian'),
    ('NA', 'NA')
)

class Spec(models.Model):

    spec = models.CharField(max_length=30)
    size = models.CharField(max_length=30)

    def __str__(self):
        return self.spec




class Inventory(models.Model):

    image = models.ImageField('Item Image', blank=True, upload_to="sweater_images/")
    color = models.CharField(max_length=75, blank=True, verbose_name='Color')
    jp_style_number = models.CharField(max_length=20, blank=True, null=True)
    sweater_description = models.TextField(blank=True, verbose_name="Description",
                                           max_length=200)
    features = models.TextField(max_length=200, verbose_name='Features', blank=True)
    fiber_content = models.TextField(max_length=200, verbose_name='Fiber Content',
                                     blank=True)
    jp_care_instructions = models.TextField(max_length=250, blank=True,
                                            verbose_name='Care Instructions')
    total_inventory = models.FloatField(default=0)
    available_inventory = models.FloatField(default=0)
    spec = models.ManyToManyField(Spec)


    def __str__(self):
        return self.jp_style_number




