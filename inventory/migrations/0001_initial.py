# Generated by Django 2.1.3 on 2018-11-05 00:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='sweater_images/', verbose_name='Item Image')),
                ('color', models.CharField(blank=True, max_length=75, verbose_name='Color')),
                ('jp_style_number', models.CharField(blank=True, max_length=20, null=True)),
                ('sweater_description', models.TextField(blank=True, max_length=200, verbose_name='Description')),
                ('features', models.TextField(blank=True, max_length=200, verbose_name='Features')),
                ('fiber_content', models.TextField(blank=True, max_length=200, verbose_name='Fiber Content')),
                ('jp_care_instructions', models.TextField(blank=True, max_length=250, verbose_name='Care Instructions')),
                ('total_inventory', models.FloatField(default=0)),
                ('available_inventory', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Spec',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spec', models.CharField(max_length=30)),
                ('size', models.CharField(max_length=30)),
            ],
        ),
        migrations.AddField(
            model_name='inventory',
            name='spec',
            field=models.ManyToManyField(to='inventory.Spec'),
        ),
    ]
