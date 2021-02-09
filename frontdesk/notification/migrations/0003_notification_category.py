# Generated by Django 3.0.11 on 2021-02-03 11:09

from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ("notification", "0002_auto_20210203_1048"),
    ]

    operations = [
        migrations.AddField(
            model_name="notification",
            name="category",
            field=models.CharField(
                choices=[
                    ("bell", "Notification"),
                    ("at-sign", "Tag"),
                    ("mail", "message"),
                    ("flag", "Pinned"),
                    ("alert-triangle", "System"),
                ],
                default="bell",
                max_length=20,
                verbose_name="Category",
            ),
        ),
    ]
