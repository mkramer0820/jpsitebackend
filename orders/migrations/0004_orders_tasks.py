# Generated by Django 2.1.2 on 2018-10-04 19:29

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_auto_20181004_1525'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='tasks',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict, null=True),
        ),
    ]