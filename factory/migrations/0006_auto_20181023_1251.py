# Generated by Django 2.1.2 on 2018-10-23 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('factory', '0005_auto_20181023_1038'),
    ]

    operations = [
        migrations.AlterField(
            model_name='factory',
            name='email',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='factory',
            name='slug',
            field=models.SlugField(blank=True, help_text='Slug Field', null=True, verbose_name='Slug'),
        ),
        migrations.AlterField(
            model_name='factory',
            name='website',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Website'),
        ),
    ]