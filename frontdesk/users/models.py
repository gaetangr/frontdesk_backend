"""
This module is responsible to handle the source of information about the data. 
It contains the essential fields and behaviors of the data for the
users app

- The endpoint are defined in the `users.urls.py` module

- The logic are defined in the `users.views.py` module

- The serializer are defined in the `users.serializer.py` module

- The signals are defined in the `users.signals.py` module

"""
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db import models


class User(AbstractUser):
    """
    Stores a :model:`auth.User`

    An abstract base class implementing a fully
    featured User model with admin-compliant permissions.
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
        return self.first_name or self.username
