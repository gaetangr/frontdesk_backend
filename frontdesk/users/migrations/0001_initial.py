# Generated by Django 3.1.2 on 2021-02-08 13:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, help_text='Job title to identify which departement the user belongs to', max_length=200, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=200, null=True)),
                ('bio', models.TextField(blank=True, help_text='Short description use in member card', null=True)),
                ('note', models.TextField(blank=True, help_text='Privates notes shown on the dashboard', null=True)),
                ('request', models.TextField(blank=True, help_text='Can be used to specify request to the manager, holiday, specific work days ...', null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
