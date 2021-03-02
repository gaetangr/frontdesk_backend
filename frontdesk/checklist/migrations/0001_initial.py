# Generated by Django 3.0.11 on 2021-02-22 14:36

from django.db import migrations
from django.db import models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("properties", "0002_auto_20210215_1441"),
    ]

    operations = [
        migrations.CreateModel(
            name="Task",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    model_utils.fields.AutoCreatedField(
                        default=django.utils.timezone.now,
                        editable=False,
                        verbose_name="created",
                    ),
                ),
                (
                    "modified",
                    model_utils.fields.AutoLastModifiedField(
                        default=django.utils.timezone.now,
                        editable=False,
                        verbose_name="modified",
                    ),
                ),
                (
                    "content",
                    models.TextField(
                        blank=True, null=True, verbose_name="Contenu de la tâche"
                    ),
                ),
                (
                    "is_done",
                    models.BooleanField(
                        default=False,
                        help_text="Si la case est cochée, la tâche n'apparait plus sur la checklist",
                        verbose_name="Fait",
                    ),
                ),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("Matin", "Morning"),
                            ("Après-midi", "Afternoon"),
                            ("Soir", "Evening"),
                            ("Nuit", "Night"),
                        ],
                        default="Matin",
                        help_text="Catégories utilisées pour filtrer et associer les tâches",
                        max_length=20,
                        verbose_name="Catégorie",
                    ),
                ),
                (
                    "property",
                    models.ForeignKey(
                        help_text="Property related to the current checklist",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="task",
                        to="properties.Property",
                        verbose_name="Établissement",
                    ),
                ),
            ],
            options={
                "verbose_name": "Tâche",
                "verbose_name_plural": "Tâches",
            },
        ),
    ]