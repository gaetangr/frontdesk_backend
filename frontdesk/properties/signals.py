"""
This module is responsible to handle signals for the properties app
In a nutshell, signals allow certain senders to notify a set of 
receivers that some action has taken place. They’re especially useful 
when many pieces of code may be interested in the same events

- The endpoint are defined in the `properties.urls.py` module

- The logic are defined in the `properties.views.py` module

- The serializer are defined in the `properties.serializer.py` module

- The behiavors of the data are defined in the `properties.models.py` module

"""
import logging

from django.core.exceptions import ObjectDoesNotExist
from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.properties.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.models import Workspace


@receiver(post_save, sender=Property)
def create_welcome_datas(sender, instance, created, **kwargs):
    """
    When a property is created, we link the instance property to a workspace and
    a property permission and we created some data to welcome the user

    Since every notebook requires an author we want the first message to be from
    the administrator (default to pk=1), to avoid triggering an error if super_user
    cannot be found, we try every users object until a superuser can be set.
    """
    if created:
        try:
            user = User.objects.get(pk=1)
        except ObjectDoesNotExist as error:
            user = User.objects.filter(is_superuser=True).first()
            logging.info(error)
        # Creating workspace and workspace.name matching property.name
        workspace = Workspace.objects.create(property=instance)

        # Creating notebook content to welcome user and populate workspace
        Notebook.objects.create(
            author=user,
            workspace=workspace,
            content="C'est votre premier message 👋, Il est temps de créer les comptes de vos collaborateurs. Vous pouvez le faire depuis votre espace manager sur votre tableau de bord.",
        )

        # When a new instance of :model:`properties.Property` is created
        # we want to be notified so we can track the data from our logging SDK
        logging.info(f"The {instance} property has been created ! ✨")
