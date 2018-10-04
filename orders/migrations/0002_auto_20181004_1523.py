# Generated by Django 2.1.2 on 2018-10-04 19:23

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderTasks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tasks', django.contrib.postgres.fields.jsonb.JSONField(default=dict)),
            ],
        ),
        migrations.AddField(
            model_name='orders',
            name='order_tasks',
            field=models.ManyToManyField(to='orders.OrderTasks'),
        ),
    ]
