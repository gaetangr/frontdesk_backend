"""
This module is responsible to handle the source of information about the data. 
It contains the essential fields and behaviors of the data for the
notification app

- The endpoint are defined in the `notification.urls.py` module

- The logic are defined in the `notification.views.py` module

- The signals are defined in the `notification.signals.py` module 

- The serializers are defined in the `notification.serializers.py` module

"""
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


User = settings.AUTH_USER_MODEL


class Notification(TimeStampedModel):
    """
    Stores a :model:`notification.Notification`

    A `notification` is way for user to send information to each others

    This model is using an `TimeStampedModel` that provides self-updating
    created and modified fields.
    """

    title = models.CharField(
        max_length=50,
        verbose_name="Titre",
    )
    content = models.TextField(verbose_name="Contenu")
    is_system = models.BooleanField(
        default=False,
        help_text="If set to true the notification is highlighted in the notification dropdown",
    )
    is_read = models.BooleanField(default=False)
    sender = models.ForeignKey(
        User,
        related_name="sender",
        blank=True,
        verbose_name="Envoyé par",
        null=True,
        on_delete=models.CASCADE,
        help_text="The user who taggued or send the notificiation to the receiver, can be null",
    )
    receiver = models.ForeignKey(
        User,
        related_name="receiver",
        verbose_name="Destinataire",
        on_delete=models.CASCADE,
        help_text="L'utilisateur selectionné recevra une notification instantanément",
    )

    class Category(models.TextChoices):
        DEFAULT = "notification", "Notification"
        TAG = "tag", "Tag"
        MESSAGE = "message", "message"
        PINNED = "pinned", "Pinned"
        SYSTEM = "system", "System"

    category = models.CharField(
        "Category",
        max_length=20,
        choices=Category.choices,
        default=Category.MESSAGE,
        help_text="Use for categorize notifications",
    )

    class Meta:
        verbose_name_plural = "Notifications"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.title
