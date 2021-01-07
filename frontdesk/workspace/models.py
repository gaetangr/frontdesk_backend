from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse
from model_utils.models import TimeStampedModel


class Workspace(TimeStampedModel):
    """
    Stores a workspace, a workspace is a page where members can exchange each other
    messages and many uselful information relating to their shift.
    """

    name = models.CharField(max_length=50, verbose_name="Nom de l'espace de travail")


class Notebook(models.Model):
    """
    Stores a note for the workspace, related to :model:`workspace.Workspace` and
    :model:`auth.User`
    """

    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="notes"
    )
    author = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="author"
    )
    content = models.CharField(
        max_length=3000, null=True, blank=True, verbose_name="Publier une note"
    )


class Comment(TimeStampedModel):
    """
    Stores a comment for the notebook, related to :model:`workspace.Workspace` and
    :model:`workspace.Notebook`
    """

    note = models.ForeignKey(
        Notebook, on_delete=models.CASCADE, related_name="comments"
    )
    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="comments"
    )
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    content = models.CharField(
        max_length=1000,
        null=True,
        blank=True,
        verbose_name="Commenter la note",
    )

    def __str__(self):

        if not self.author:
            self.user = "Utilisateur supprimé"
        return f"{self.pk}"
