# Generated by Django 2.1.2 on 2018-10-15 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_orders_due date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='order_tasks',
        ),
        migrations.RemoveField(
            model_name='orders',
            name='tasks',
        ),
    ]
