import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.property.models import Property, PropertyPermission
from frontdesk.workspace.models import Notebook, Workspace

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Property)
def create_welcome_datas(sender, instance, created, **kwargs):
    """When a property is created, we link the instance property to a workspace and
    a logbook and we created some data to welcome the user"""
    if created:
        workspace = Workspace.objects.create(
            property=instance, name=f"Espace de travail - {instance.name}"
        )
        PropertyPermission.objects.create(user=instance.user, property=instance, is_staff=True, is_admin=True)
        Notebook.objects.create(
            workspace=workspace,
            content="C'est votre premier message 👋, Il est temps d'inviter vos collaborateurs !",
        )
        logger.info(f"The {instance.name} property has been created")
