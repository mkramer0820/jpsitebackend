# Generated by Django 2.1.2 on 2018-10-19 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('factory', '0002_auto_20181019_1315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='factory',
            name='phone',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
