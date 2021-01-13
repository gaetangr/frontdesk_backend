from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.property.models import Property
from frontdesk.workspace.models import Workspace, Notebook

@receiver(post_save, sender=Property)
def create_profile(sender, instance, created, **kwargs):
    """When a property is created, we link the instance property to a workspace and
    a logbook"""
    if created:
        workspace = Workspace.objects.create(property=instance, name=f"Espace de travail - {instance.name}")
        Notebook.objects.create(workspace=workspace, content="C'est votre premier message 👋, Il est temps d'inviter vos collaborateurs !")