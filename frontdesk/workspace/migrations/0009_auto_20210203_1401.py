# Generated by Django 3.0.11 on 2021-02-03 13:01

from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("workspace", "0008_auto_20210203_1359"),
    ]

    operations = [
        migrations.AlterField(
            model_name="notebook",
            name="tag_user",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
