# Generated by Django 3.1.2 on 2021-01-17 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("property", "0002_auto_20210117_1303"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="is_premium",
            field=models.BooleanField(default=False),
        ),
    ]