"""
This module is responsible to handle the source of information about the data. 
It contains the essential fields and behaviors of the data for the
workspace app

- The endpoint are defined in the `checklist.urls.py` module

- The logic are defined in the `checklist.views.py` module

- The serializer are defined in the `checklist.serializer.py` module

"""
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel

from frontdesk.properties.models import Property


User = settings.AUTH_USER_MODEL


class Task(TimeStampedModel):
    """
    Stores a task for the checklist, related to :model:`checklist.Checklist`

    A `task` is a way for users to add reccuring tasks.

    This model is using an `TimeStampedModel` that provides self-updating
    created and modified fields.
    """

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="task",
        help_text="Établissement",
        verbose_name="Établissement",
    )

    content = models.TextField(null=True, blank=True, verbose_name="Contenu de la tâche")
    is_done = models.BooleanField(
        "Fait",
        default=False,
        help_text="Si la case est cochée, la tâche n'apparait plus sur la checklist",
    )

    class Category(models.TextChoices):
        """ Define categories for the checklist """

        MORNING = "Matin", "Matin"
        AFTERNOON = "Après-midi", "Après-midi"
        EVENING = "Soir", "Soir"

    category = models.CharField(
        "Catégorie",
        max_length=20,
        choices=Category.choices,
        default=Category.MORNING,
        help_text="Catégories utilisées pour filtrer et associer les tâches",
    )

    class Meta:
        verbose_name_plural = "Tâches"
        verbose_name = "Tâche"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.content
