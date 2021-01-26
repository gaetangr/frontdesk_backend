from autoslug import AutoSlugField
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel

from frontdesk.property.models import Property


class Workspace(TimeStampedModel):
    """
    Stores a workspace, a workspace is a page where members can exchange each other
    messages and many uselful information relating to their shift.
    """

    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="workspace"
    )
    name = models.CharField(max_length=50, verbose_name="Nom de l'espace de travail")
    slug = AutoSlugField(
        "Nom de l'espace de travail'",
        unique=True,
        always_update=False,
        populate_from="name",
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        nbr_note = self.notes.all().count()
        return f"{self.name} -> nombre de messages {nbr_note}"


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
        max_length=3000, null=True, blank=True, verbose_name="Contenu du message"
    )
    is_done = models.BooleanField(
        default=False,
        help_text="If set to true the note is mark as done and display a different design",
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.content


class Comment(TimeStampedModel):
    """
    Stores a comment for the notebook, related to :model:`workspace.Workspace` and
    :model:`workspace.Notebook`
    """

    notebook = models.ForeignKey(
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
        """ Return instance with a human readable fashion """
        return self.content
