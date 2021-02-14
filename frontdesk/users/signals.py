"""
This module is responsible to handle signals for the users app
In a nutshell, signals allow certain senders to notify a set of 
receivers that some action has taken place. They’re especially useful 
when many pieces of code may be interested in the same events

- The endpoint are defined in the `users.urls.py` module

- The logic are defined in the `users.views.py` module

- The serializer are defined in the `users.serializer.py` module

- The behiavors of the data are defined in the `users.models.py` module

"""
from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.notification.models import Notification
from frontdesk.users.models import User


@receiver(post_save, sender=User)
def create_notification(sender, instance, created, **kwargs):
    """ When an instance of a user is created, a notification is sent to the user """
    if created:

        Notification.objects.create(
            receiver=instance,
            # if user has first_name filled out use it else use username
            title=f"Bienvenue {instance.first_name if instance.first_name else instance.username} 👋",
            content="N'hésitez pas à découvrir nos outils et consulter la documentation",
        )
