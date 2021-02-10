from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


User = settings.AUTH_USER_MODEL


class Notification(TimeStampedModel):
    """
    Stores a notification
    """

    title = models.CharField(max_length=50, verbose_name="Titre")
    content = models.CharField(max_length=300, verbose_name="Contenu")
    is_system = models.BooleanField(
        default=False,
        help_text="If set to true the notification is highlighted in the notification dropdown",
    )
    is_read = models.BooleanField(default=False)
    sender = models.ForeignKey(
        User,
        related_name="sender",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        help_text="The user who taggued or send the notificiation to the receiver, can be null",
    )
    receiver = models.ForeignKey(
        User,
        related_name="reveiver",
        on_delete=models.CASCADE,
        help_text="The user who is receiving the notification",
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
        default=Category.DEFAULT,
        help_text="Use for categorize notifications",
    )

    class Meta:
        verbose_name_plural = "Notifications"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.title
