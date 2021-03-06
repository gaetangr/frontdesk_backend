# Generated by Django 3.1.2 on 2021-04-16 08:42

from django.db import migrations
from django.db import models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("checklist", "0001_initial"),
        ("properties", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="property",
            field=models.ForeignKey(
                help_text="Établissement",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="task",
                to="properties.property",
                verbose_name="Établissement",
            ),
        ),
    ]
