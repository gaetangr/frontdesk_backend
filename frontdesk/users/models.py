from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    """
    Stores a profile, a profile is related to an instance of :model:`auth.User`
    It will be trigger with a signal each time a User instance is created.
    Profile will store non mandatory information
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="media", max_length=254, null=True, blank=True)
    linkedin = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.user.username
