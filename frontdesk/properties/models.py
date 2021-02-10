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
        help_text="The name will be used to identify the property",
    )
    slug = AutoSlugField(
        "Nom de l'établissement", unique=True, always_update=False, populate_from="name"
    )
    collaborator = models.ManyToManyField(
        User,
        verbose_name="Collaborateurs",
        help_text="Users selected will have full access to the property and the workspace related",
    )

    is_premium = models.BooleanField(
        default=False,
        help_text="If true property has premium features",
    )

    class Meta:
        verbose_name_plural = "Properties"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.name
