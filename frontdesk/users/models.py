from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    """
    Stores a profile, a profile is related to an instance of :model:`auth.User`
    It will be trigger with a signal each time a User instance is created.
    Profile will store non mandatory information
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    linkedin = models.CharField(max_length=200, null=True, blank=True)
    is_manager = models.BooleanField(default=False)
    
