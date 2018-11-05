# Generated by Django 2.1.3 on 2018-11-05 00:00

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
                ('isActive', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=64, verbose_name='Company Name')),
                ('address1', models.CharField(blank=True, max_length=64, verbose_name='Address1')),
                ('address2', models.CharField(blank=True, max_length=64, verbose_name='Address2')),
                ('address3', models.CharField(blank=True, max_length=64, verbose_name='Address3')),
                ('city', models.CharField(blank=True, max_length=40, null=True, verbose_name='City')),
                ('state', models.CharField(blank=True, max_length=64, verbose_name='state')),
                ('zip', models.CharField(blank=True, max_length=10, verbose_name='Zip')),
                ('country', models.CharField(blank=True, max_length=64, verbose_name='country')),
                ('email', models.CharField(blank=True, max_length=40, null=True)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('website', models.CharField(blank=True, max_length=50, null=True, verbose_name='Website')),
                ('description', models.TextField(blank=True, null=True)),
                ('createdOn', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['contact_name', 'name', 'address1'],
            },
        ),
        migrations.CreateModel(
            name='FactoryContact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='Contact First Name')),
                ('contact_last_name', models.CharField(blank=True, max_length=30, verbose_name='Contact Last Name')),
                ('contact_phone_number', models.CharField(blank=True, max_length=30, verbose_name='Phone Number')),
                ('contact_email', models.EmailField(blank=True, max_length=30, verbose_name='Contact Email')),
                ('isActive', models.BooleanField(default=True)),
            ],
        ),
        migrations.AddField(
            model_name='factory',
            name='contact_name',
            field=models.ForeignKey(blank=True, max_length=64, null=True, on_delete='CASCADE', to='factory.FactoryContact'),
        ),
    ]
