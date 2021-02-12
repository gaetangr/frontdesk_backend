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
        help_text="Rôle dans l'entreprise, (ex: directeur, réceptionniste ..)",
    )
    note = models.TextField(
        null=True, blank=True, help_text="Privates notes shown on the dashboard"
    )

    is_admin = models.BooleanField(
        "Administrateur",
        default=False,
        help_text="Précise si l’utilisateur est administrateur, l'administrateur est le seul rôle permettant de supprimer et modifier un établissement, ainsi que supprimer un utilisateur",
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.first_name if self.first_name else self.username
