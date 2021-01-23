from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """ When an instance of a user is created, a profile is created and links to the user """
    if created:
        Profile.objects.create(user=instance)
        instance.profile.save()