"""
This module is responsible to handle signals for the notification app
In a nutshell, signals allow certain senders to notify a set of 
receivers that some action has taken place. They’re especially useful 
when many pieces of code may be interested in the same events

- The endpoint are defined in the `notification.urls.py` module

- The logic are defined in the `notification.views.py` module

- The serializer are defined in the `notification.serializer.py` module 

- The behiavors of the data are defined in the `notification.models.py` module
"""
from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.notification.models import Notification
from frontdesk.properties.models import Document
from frontdesk.workspace.models import Notebook


@receiver(post_save, sender=Notebook)
def create_pinned_notification(sender, instance, created, **kwargs):
    """
    If a notification is pinned collaborators will received a notification
    """

    if instance.is_pinned:
        for user in instance.workspace.property.collaborator.all():
            Notification.objects.create(
                receiver=user,
                category="pinned",
                title="Une consigne a été épinglée",
                content=f"La consigne « {instance.content}  » a été épinglée",
            )


@receiver(post_save, sender=Document)
def create_document_notification(sender, instance, created, **kwargs):
    """
    If a document is created collaborators will received a notification
    """
    if instance.category == "planning":
        for user in instance.properties.collaborator.all():
            Notification.objects.create(
                receiver=user,
                category="default",
                title="Un planning a été ajouté",
                content="Un nouveau planning est disponible sur votre tableau de bord",
            )
    else:
        for user in instance.properties.collaborator.all():
            Notification.objects.create(
                receiver=user,
                category="default",
                title="Un document a été ajouté",
                content="Un nouveau document est disponible sur votre tableau de bord",
            )


# :TODO Not yet implemented, schedule for March 2021
""" 
@receiver(post_save, sender=Notebook)
def create_tag_notification(sender, instance, created, **kwargs):
    "" If a notification is pinned collaborators will received a notification ""

    for user in instance.tag_user.all():
        Notification.objects.create(
            receiver=user,
            category="tag",
            title="Vous avez été tagué",
            content=f"Vous avez été tagué sur la consigne « {instance.content}  »",
        ) 
"""
