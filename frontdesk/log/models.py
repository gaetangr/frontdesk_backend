from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel

class LogBook(TimeStampedModel):
    """
    Stores a logbook, a logbook is used by many instances of :model:`auth.User`
    It is used to log maintenance related tasks for a property
    """

    name = models.CharField(
        max_length=50, verbose_name="Nom du registre de maintenance"
    )

    def __str__(self):
        return f"{self.name}"


class LogMessage(TimeStampedModel):
    """
    Stores a log message, a log message is related to :model:`log.LogBook`
    It is used to leave comments and details
    """

    logbook = models.ForeignKey(
        LogBook, on_delete=models.CASCADE, related_name="logmessages"
    )
    content = models.CharField(max_length=200, verbose_name="Détail du problème")
    author = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        related_name="reported_by",
        verbose_name="Reporté par",
    )
    location = models.CharField(max_length=20, verbose_name="Lieu")
