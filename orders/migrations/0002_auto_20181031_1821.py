# Generated by Django 2.1.2 on 2018-10-31 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='due_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
