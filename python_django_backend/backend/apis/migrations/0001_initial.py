# Generated by Django 2.1.5 on 2019-03-26 05:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='AnimalMovement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('distance', models.FloatField()),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.Animal')),
            ],
        ),
        migrations.CreateModel(
            name='Owns',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('animal_given_name', models.CharField(max_length=30)),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.Animal')),
            ],
        ),
        migrations.CreateModel(
            name='Species',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('species', models.CharField(max_length=30)),
                ('movement_type', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('last_update', models.DateField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserMovement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('distance', models.FloatField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.User')),
            ],
        ),
        migrations.AddField(
            model_name='owns',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.User'),
        ),
        migrations.AddField(
            model_name='animal',
            name='species',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.Species'),
        ),
    ]