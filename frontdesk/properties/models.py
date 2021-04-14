"""
This module is responsible to handle the source of information about the data. 
It contains the essential fields and behaviors of the data for the
properties app

- The endpoint are defined in the `properties.urls.py` module

- The logic are defined in the `properties.views.py` module

- The serializer are defined in the `properties.serializer.py` module

- The signals are defined in the `properties.signals.py` module 


"""

from autoslug import AutoSlugField
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


User = settings.AUTH_USER_MODEL


class Property(TimeStampedModel):
    """
    Stores a :model:`properties.Property`

    A `properties` is the main model where an user can add collaborators

    This model is using an `TimeStampedModel` that provides self-updating
    created and modified fields.
    """

    name = models.CharField(
        max_length=50,
        verbose_name="Nom de l'établissement",
        help_text="Le nom de votre établissement",
    )
    notice = models.TextField(
        verbose_name="Information du jour",
        help_text="L'information du jour apparaitra sur le tableau de bord de votre équipe",
        null=True,
        blank=True,
    )
    slug = AutoSlugField(
        "Nom de l'établissement", unique=True, always_update=False, populate_from="name"
    )
    collaborator = models.ManyToManyField(
        User,
        verbose_name="Collaborateurs",
        help_text="Les utilisateurs ajoutés auront accès à l'application web",
    )

    is_premium = models.BooleanField(
        default=False,
        help_text="Si coché, votre établissement dispose d'un compte premium",
        verbose_name="Premium",
    )

    class Meta:
        verbose_name_plural = "Établissements"
        verbose_name = "Établissement"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name


class Document(TimeStampedModel):
    """
    Stores a :model:`properties.Document` for the properties, related to :model:`properties.Properties`

    A `document` is a way for users to save files and images for the properties

    This model is using an `TimeStampedModel` that provides self-updating
    created and modified fields.
    """

    properties = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="documents"
    )
    file = models.FileField(
        "Document",
        help_text="Un fichier disponible au téléchargement par votre équipe",
        null=True,
        blank=True,
    )
    name = models.CharField(
        "Description",
        max_length=300,
        help_text="Description de votre fichier, laissez vide si besoin",
        null=True,
        blank=True,
    )

    class Category(models.TextChoices):
        """ Define categories for the document """

        DEFAULT = "document", "Document"
        MAINTENANCE = "checklist", "Checklist"
        HOUSEKEEPING = "planning", "Planning"

    category = models.CharField(
        "Catégorie",
        max_length=20,
        choices=Category.choices,
        default=Category.DEFAULT,
        help_text="Catégories utilisées pour filtrer les fichiers",
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name
