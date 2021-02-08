import logging

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.notification.models import Notification

from .models import Profile


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """ When an instance of a user is created, a profile is created and links to the user """
    if created:
        Profile.objects.create(user=instance)
        instance.profile.save()

        logging.info(f"{instance} has been created ✨")


@receiver(post_save, sender=User)
def create_notification(sender, instance, created, **kwargs):
    """ When an instance of a user is created, a notification is sent to the user """
    if created:
        # by default, notifications sent by the system are attributed to the admin

        Notification.objects.create(
            receiver=instance,
            # if user has first_name filled out use it else use username
            title=f"Bienvenue {instance.first_name if instance.first_name else instance.username} 👋",
            content="N'hésitez pas à remplir votre profil pour finaliser l'inscription",
        )
