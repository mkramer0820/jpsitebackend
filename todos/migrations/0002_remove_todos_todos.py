# Generated by Django 2.1 on 2018-09-28 15:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todos',
            name='todos',
        ),
    ]
