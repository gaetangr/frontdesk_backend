# Generated by Django 3.1.2 on 2021-02-01 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="title",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]