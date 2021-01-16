from autoslug import AutoSlugField
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


class Property(TimeStampedModel):
    """
    Stores a property
    """

    name = models.CharField(max_length=50, verbose_name="établissemment")
    slug = AutoSlugField(
        "Nom de l'établissement", unique=True, always_update=False, populate_from="name"
    )
    collaborator = models.ManyToManyField(
        User, verbose_name="Collaborateurs", related_name="collaborators"
    )

    class Meta:
        verbose_name_plural = "Properties"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name
