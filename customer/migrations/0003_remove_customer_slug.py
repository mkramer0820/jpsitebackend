# Generated by Django 2.1.2 on 2018-10-30 13:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0002_auto_20180928_0952'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='slug',
        ),
    ]
