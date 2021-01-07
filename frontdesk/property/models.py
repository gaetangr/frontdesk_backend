from uuid import uuid4

from autoslug import AutoSlugField
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel

from frontdesk.log.models import LogBook
from frontdesk.workspace.models import Workspace


class Property(TimeStampedModel):
    """
    Stores a property
    """

    name = models.CharField(max_length=50, verbose_name="établissemment")
    slug = AutoSlugField(
        "Nom de l'établissement", unique=True, always_update=False, populate_from="name"
    )
    collaborator = models.ManyToManyField(
        User, verbose_name="Collaborateurs", related_name="collaborator"
    )
    workspace = models.ManyToManyField(
        Workspace, verbose_name="workspace", related_name="property", blank=True
    )
    logbook = models.ManyToManyField(
        LogBook, verbose_name="Logbook", related_name="log", blank=True
    )
    token = models.CharField(
        max_length=500,
        blank=True,
        help_text="Token to secure the workspace, each token are unique and should use an universally unique identifier ",
    )

    class Meta:
        verbose_name_plural = "Properties"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.token = uuid4()

        super(TimeStampedModel, self).save(*args, **kwargs)


# TODO WHEN CREATING PROPERTY AUTO CREATING LOG AND WORKSPACE + SET USER TO WORKSPACE
