from autoslug import AutoSlugField
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


class Property(TimeStampedModel):
    """
    Stores a property, using TimeStampedModel to provide a self updating
    and creating field.
    """

    name = models.CharField(max_length=50, verbose_name="Nom de l'établissement",
    help_text="The name will be used to identify the property")
    slug = AutoSlugField(
        "Nom de l'établissement", unique=True, always_update=False, populate_from="name"
    )
    collaborator = models.ManyToManyField(
        User,
        verbose_name="Collaborateurs",
        help_text="Users selected will have full access to the property and the workspace related"
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


class PropertyPermission(models.Model):
    """
    Stores a property, using TimeStampedModel to provide a self updating
    and creating field.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    property = models.OneToOneField(Property, on_delete=models.CASCADE)
    is_admin = models.BooleanField(
        default=False,
        help_text="If set to true the user is able to delete or update a property and delete, update and create an user",
    )
    is_staff = models.BooleanField(
        default=False,
        help_text="If set to true the user is able to delete or update a property and delete, update and create an user",
    )

    class Meta:
        verbose_name_plural = "Properties permissions"

    # This method is exclude from coverage report
    def __str__(self):  # pragma: no cover
        """ Return instance with a human readable fashion """
        is_admin = (
            "est administateur"
            if self.is_admin == True
            else "n'est pas administrateur"  # noqa
        )
        is_staff = "est staff" if self.is_staff == True else "n'est pas staff"  # noqa
        return f"{self.user} {is_admin} et {is_staff} "
