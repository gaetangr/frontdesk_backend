# Generated by Django 3.0.11 on 2021-02-03 16:52

from django.conf import settings
from django.db import migrations
from django.db import models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("workspace", "0009_auto_20210203_1401"),
    ]

    operations = [
        migrations.AlterField(
            model_name="notebook",
            name="category",
            field=models.CharField(
                choices=[
                    ("equipe", "Equipe"),
                    ("maintenance", "Maintenance"),
                    ("housekeeping", "Etage"),
                    ("staff", "Staff"),
                    ("manager", "Manager"),
                ],
                default="equipe",
                help_text="Use to display certains notes for a specific group of users, by default messages are shown to everyone",
                max_length=20,
                verbose_name="Category",
            ),
        ),
        migrations.AlterField(
            model_name="notebook",
            name="tag_user",
            field=models.ManyToManyField(
                blank=True,
                help_text="Users who are selected will be notified with the message content",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="notebook",
            name="workspace",
            field=models.ForeignKey(
                help_text="Workspace is linked to a property, the workspace is where users exchange informations",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="notes",
                to="workspace.Workspace",
            ),
        ),
    ]
