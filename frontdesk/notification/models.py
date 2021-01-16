from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel


class Notification(TimeStampedModel):
    """
    Stores a notification
    """

    title = models.CharField(max_length=50, verbose_name="Titre")
    content = models.CharField(max_length=300, verbose_name="Contenu")
    is_system = models.BooleanField(default=False)
    is_read = models.BooleanField(default=False)
    sender = models.OneToOneField(
        User, related_name="sender", blank=True, null=True, on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        User, related_name="reveiver", on_delete=models.CASCADE
    )

    class Meta:
        verbose_name_plural = "Notifications"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.title
