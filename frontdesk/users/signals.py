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
import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.notification.models import Notification
from frontdesk.users.models import User


@receiver(post_save, sender=User)
def create_notification_and_hash_password(sender, instance, created, **kwargs):
    """
    When an instance of a user is created we are triggering 2 events:

    - Since password are not hash due to autocomplete mecanisme from the
    admin custom manager, we need to hash it once the user set his password.
    We are using the `set_password` method with the instance receive from the
    object.

    - We are creating a new notification instance, if the user did not give any
    first_name we set the title to username, else first_name is prefered.
    """

    if created:
        instance.set_password(instance.password)
        instance.save()
        Notification.objects.create(
            receiver=instance,
            # if user has first_name filled out use it else use username
            title=f"Bienvenue {instance.first_name if instance.first_name else instance.username} 👋",
            content="N'hésitez pas à découvrir nos outils et consulter la documentation",
        )

        # When a new instance of :model:`users.Users` is created
        # we want to be notified so we can track the data from our logging SDK
        logging.info(f"{instance} has joined Front Desk! ✨")
