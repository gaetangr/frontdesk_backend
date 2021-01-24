import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.property.models import Property
from frontdesk.workspace.models import Notebook, Workspace


@receiver(post_save, sender=Property)
def create_welcome_datas(sender, instance, created, **kwargs):
    """When a property is created, we link the instance property to a workspace and
    a property permission and we created some data to welcome the user"""

    if created:
        # Creating workspace and workspace.name matching property.name
        workspace = Workspace.objects.create(
            property=instance, name=f"Espace de travail - {instance.name}"
        )
        # Creating notebook content to welcome user and populate workspace
        Notebook.objects.create(
            workspace=workspace,
            content="C'est votre premier message 👋, Il est temps d'inviter vos collaborateurs !",
        )

        # Creating a property permission and set current us to staff and admin
        # PropertyPermission.objects.create(user=user, property=instance, is_staff=True, is_admin=True)
        # Logging new property so it's send to sentry logging
        logging.info(f"The {instance.name} property has been created ! ✨")
