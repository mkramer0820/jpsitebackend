# Generated by Django 2.1 on 2018-09-28 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Factory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, verbose_name='Company Name')),
                ('address1', models.CharField(blank=True, max_length=64, verbose_name='Address1')),
                ('address2', models.CharField(blank=True, max_length=64, verbose_name='Address2')),
                ('address3', models.CharField(blank=True, max_length=64, verbose_name='Address3')),
                ('coutnry', models.CharField(blank=True, max_length=64, verbose_name='country')),
                ('state/prov', models.CharField(blank=True, max_length=64, verbose_name='State-Province')),
                ('zip-postal', models.CharField(blank=True, max_length=10, verbose_name='Zip or Postal Code')),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('website', models.URLField(blank=True, null=True, verbose_name='Website')),
                ('description', models.TextField(blank=True, null=True)),
                ('createdOn', models.DateTimeField(auto_now_add=True, verbose_name='Created on')),
                ('isActive', models.BooleanField(default=True)),
                ('slug', models.SlugField(blank=True, help_text='Slug Field', verbose_name='Slug')),
            ],
        ),
        migrations.CreateModel(
            name='FactoryContact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='Contact First Name')),
                ('contact_last_name', models.CharField(blank=True, max_length=30, verbose_name='Contact Last Name')),
                ('contact_phone_number', models.CharField(blank=True, max_length=30, verbose_name='Phone Number')),
                ('contact_email', models.EmailField(blank=True, max_length=30, verbose_name='Contact Email')),
                ('slug', models.SlugField(blank=True, help_text='Slug Field', verbose_name='Slug')),
            ],
        ),
        migrations.AddField(
            model_name='factory',
            name='contact_name',
            field=models.ForeignKey(blank=True, max_length=64, on_delete='CASCADE', to='factory.FactoryContact'),
        ),
    ]
