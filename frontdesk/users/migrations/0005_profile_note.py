# Generated by Django 3.0.11 on 2021-02-01 21:20

from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_profile_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="note",
            field=models.TextField(blank=True, null=True),
        ),
    ]
