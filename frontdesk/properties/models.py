from autoslug import AutoSlugField
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


User = settings.AUTH_USER_MODEL


class Property(TimeStampedModel):
    """
    Stores a property, using TimeStampedModel to provide a self updating
    and creating field.
    """

    name = models.CharField(
        max_length=50,
        verbose_name="Nom de l'établissement",
        help_text="Le nom de votre établissement",
    )
    notice = models.TextField(
        verbose_name="Ordre du jour",
        help_text="L'ordre du jour apparaitra sur le tableau de bord de votre équipe",
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
        help_text="Si coché, vous disposez de fonctionnalités exlusives et de contenu illimité",
        verbose_name="Offre premium",
    )
    is_sponsors = models.BooleanField(
        default=False,
        help_text="Si coché, vous disposez de fonctionnalités exlusives et de contenu illimité",
        verbose_name="Offre sponsors",
    )

    class Meta:
        verbose_name_plural = "Établissements"
        verbose_name = "Établissement"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name


class Planning(TimeStampedModel):
    """"""

    properties = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="plannings"
    )
    file = models.FileField(
        "Planning",
        help_text="Un planning disponible au téléchargement par votre équipe",
        null=True,
        blank=True,
    )
    name = models.CharField(
        "Description",
        max_length=300,
        help_text="Description de votre planning, laissez vide si besoin",
        null=True,
        blank=True,
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name if self.name else "Aucune description"


class Checklist(TimeStampedModel):
    """"""

    properties = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="checklists"
    )
    file = models.FileField(
        "Checklist",
        help_text="Une checklist disponible au téléchargement par votre équipe",
        null=True,
        blank=True,
    )
    name = models.CharField(
        "Description",
        max_length=300,
        help_text="Description de votre checklist, laissez vide si besoin",
        null=True,
        blank=True,
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name if self.name else "Aucune description"


class Document(TimeStampedModel):
    """"""

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

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name if self.name else "Aucune description"
