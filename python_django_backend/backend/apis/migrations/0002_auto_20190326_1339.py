# Generated by Django 2.1.5 on 2019-03-26 20:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usermovement',
            name='time',
        ),
        migrations.AddField(
            model_name='usermovement',
            name='date',
            field=models.DateField(default=datetime.date(2019, 1, 1)),
            preserve_default=False,
        ),
    ]
