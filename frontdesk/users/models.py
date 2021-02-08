from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    """
    Stores a profile, a profile is related to an instance of :model:`auth.User`
    It will be trigger with a signal each time a User instance is created.
    Profile will store non mandatory information
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    title = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        help_text="Job title to identify which departement the user belongs to",
    )
    phone_number = models.CharField(max_length=200, null=True, blank=True)
    bio = models.TextField(
        null=True, blank=True, help_text="Short description use in member card"
    )
    note = models.TextField(
        null=True, blank=True, help_text="Privates notes shown on the dashboard"
    )
    request = models.TextField(
        null=True,
        blank=True,
        help_text="Can be used to specify request to the manager, holiday, specific work days ...",
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.user.username
