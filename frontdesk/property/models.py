from autoslug import AutoSlugField
from uuid import uuid4
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


class Property(TimeStampedModel):
    """
    Stores a property, using TimeStampedModel to provide a self updating
    and creating field.
    """

    name = models.CharField(max_length=50, verbose_name="établissemment")
    slug = AutoSlugField(
        "Nom de l'établissement", unique=True, always_update=False, populate_from="name"
    )
    collaborator = models.ManyToManyField(
        User, verbose_name="Collaborateurs", related_name="collaborators"
    )
    token = models.CharField(
        max_length=500,
        blank=True,
        help_text="Token to secure the workspace, each token are unique and should use an universally unique identifier ",
    )

    class Meta:
        verbose_name_plural = "Properties"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name

    def save(self, *args, **kwargs):
        """ Auto generate a token when object is created and saved"""
        self.token = uuid4()

        super(TimeStampedModel, self).save(*args, **kwargs)
