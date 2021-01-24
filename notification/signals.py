from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from frontdesk.notification.models import Notification

from frontdesk.property.models import Property


@receiver(post_save, sender=Property)
def create_notification(sender, instance, created, **kwargs):
    """When a property is created, we link the instance property to a workspace and
    a logbook"""
    user = User.objects.get(pk=1)
    user_pk = user.collaborators.pk.first()
    if created:
        Notification.objects.create(
            is_system=True,
            receiver=user,
            title=f"{user_pk}",
            content=f"Espace de travail - {instance.name}",
        )
