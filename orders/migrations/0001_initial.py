# Generated by Django 2.1.2 on 2018-11-19 20:26

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inventory', '0001_initial'),
        ('factory', '0001_initial'),
        ('customer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderExpense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('totalExpense', models.FloatField(blank=True, null=True)),
                ('expenseItems', django.contrib.postgres.fields.jsonb.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isActive', models.BooleanField(default=True)),
                ('customer_order_number', models.CharField(blank=True, max_length=100, null=True, verbose_name='Buyer Order Number')),
                ('buyer_style_number', models.CharField(blank=True, max_length=100, verbose_name='Buyer Style Number')),
                ('jp_style_number', models.CharField(blank=True, max_length=20, verbose_name='Jeanne Pierre Style Number')),
                ('factory_ship_date', models.DateTimeField(blank=True, null=True, verbose_name='Ship to Factory Date')),
                ('cost_from_factory', models.FloatField(blank=True, null=True, verbose_name='Factory Cost')),
                ('buyers_price', models.FloatField(blank=True, null=True, verbose_name='Price Buyer Paid')),
                ('order_type', models.CharField(choices=[('DDP', 'DDP'), ('FOB', 'FOB'), ('NA', 'NA')], max_length=40, null=True, verbose_name='Shipment Type')),
                ('qty', models.FloatField(blank=True, null=True, verbose_name='Order Qty')),
                ('sweater_image', models.ImageField(blank=True, null=True, upload_to='sweater_images/', verbose_name='Item Image')),
                ('sweater_description', models.TextField(blank=True, max_length=200, null=True, verbose_name='Item Des.')),
                ('brand', models.CharField(blank=True, choices=[('888', 'eight eight eight'), ('JP', 'JEANNE PIERRE'), ('AVE', 'AVENUE'), ('OTHER', 'PRIVATE LABEL')], max_length=40, null=True, verbose_name='Label')),
                ('fiber_content', models.TextField(blank=True, max_length=200, null=True, verbose_name='Fiber Content Des.')),
                ('jp_care_instructions', models.TextField(blank=True, max_length=250, verbose_name='Care Instructions')),
                ('color', models.CharField(blank=True, max_length=75, verbose_name='Color Des.')),
                ('due_date', models.DateTimeField(blank=True, null=True)),
                ('Buyer', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='customer.Customer')),
                ('Factory', models.ForeignKey(blank=True, default=None, max_length=100, null=True, on_delete=django.db.models.deletion.CASCADE, to='factory.Factory')),
                ('jp_style_number_test', models.ManyToManyField(blank=True, related_name='_orders_jp_style_number_test_+', to='inventory.Inventory', verbose_name='Jp Style')),
            ],
        ),
        migrations.CreateModel(
            name='OrderTasks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isActive', models.BooleanField(default=True)),
                ('set_name', models.CharField(blank=True, max_length=50, null=True)),
                ('todos_group', models.CharField(blank=True, max_length=1000, null=True)),
                ('set_status', models.CharField(blank=True, max_length=20, null=True)),
                ('todos', django.contrib.postgres.fields.jsonb.JSONField()),
                ('order', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='orders.Orders')),
            ],
        ),
        migrations.AddField(
            model_name='orderexpense',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Orders'),
        ),
    ]
