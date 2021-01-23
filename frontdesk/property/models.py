from autoslug import AutoSlugField
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


class MembersManager(models.Manager):
    """Set custom methods for a product."""

    def get_all(self, pk):
        return self.get(pk=pk).collaborator.all()


class Property(TimeStampedModel):
    """
    Stores a property, using TimeStampedModel to provide a self updating
    and creating field.
    """

    name = models.CharField(max_length=50, verbose_name="Nom de l'établissement")
    slug = AutoSlugField(
        "Nom de l'établissement", unique=True, always_update=False, populate_from="name"
    )
    collaborator = models.ManyToManyField(
        User,
        verbose_name="Collaborateurs",
    )

    is_premium = models.BooleanField(
        default=False,
        help_text="If true property has premium features",
    )

    objects = models.Manager()
    members = MembersManager()

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

    def __str__(self):
        """ Return instance with a human readable fashion """
        is_admin = (
            "est administateur" if self.is_admin == True else "n'est pas administrateur"
        )
        is_staff = "est staff" if self.is_staff == True else "n'est pas staff"
        return f"{self.user} {is_admin} et {is_staff} "
