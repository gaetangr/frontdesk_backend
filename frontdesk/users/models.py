from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db import models


class User(AbstractUser):
    """
    Stores a profile, a profile is related to an instance of :model:`auth.User`
    It will be trigger with a signal each time a User instance is created.
    Profile will store non mandatory information

    Args:
        AbstractUser : An abstract base class for extending user model
    """

    title = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        help_text="Job title to identify which departement the user belongs to",
    )
    note = models.TextField(
        null=True, blank=True, help_text="Privates notes shown on the dashboard"
    )

    is_admin = models.BooleanField(
        default=False,
        help_text="If set to true the user is able to delete or update a property and delete, update and create an user",
    )
    is_staff = models.BooleanField(
        default=False,
        help_text="If set to true the user is able to delete or update a property and delete, update and create an user",
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.username
