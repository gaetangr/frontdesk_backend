# Generated by Django 3.0.11 on 2021-02-07 11:19

from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0006_auto_20210205_1625"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="phone_number",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]