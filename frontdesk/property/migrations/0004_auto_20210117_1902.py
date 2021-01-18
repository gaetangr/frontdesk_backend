# Generated by Django 3.1.2 on 2021-01-17 18:02

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("property", "0003_property_is_premium"),
    ]

    operations = [
        migrations.AlterField(
            model_name="property",
            name="collaborator",
            field=models.ManyToManyField(
                to=settings.AUTH_USER_MODEL, verbose_name="Collaborateurs"
            ),
        ),
        migrations.AlterField(
            model_name="property",
            name="is_premium",
            field=models.BooleanField(
                default=False, help_text="If true property has premium features"
            ),
        ),
    ]