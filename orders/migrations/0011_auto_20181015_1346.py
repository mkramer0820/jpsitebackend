# Generated by Django 2.1.2 on 2018-10-15 17:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_auto_20181015_0938'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orders',
            old_name='Due Date',
            new_name='due_date',
        ),
    ]