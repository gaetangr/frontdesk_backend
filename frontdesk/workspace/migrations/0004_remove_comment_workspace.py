# Generated by Django 3.0.11 on 2021-01-26 15:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workspace', '0003_workspace_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='workspace',
        ),
    ]