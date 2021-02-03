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
        return self.name


class Notebook(TimeStampedModel):
    """
    Stores a note for the workspace, related to :model:`workspace.Workspace` and
    :model:`auth.User`
    """

    workspace = models.ForeignKey(
        Workspace, on_delete=models.CASCADE, related_name="notes",
        help_text="Workspace is linked to a property, the workspace is where users exchange informations"
    )
    author = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="author"
    )

    tag_user = models.ManyToManyField(User, blank=True, help_text="Users who are selected will be notified with the message content")
    
    class Category(models.TextChoices):
        """ Define categories for the workspace """
        DEFAULT = "equipe", "Equipe"
        MAINTENANCE = "maintenance", "Maintenance"
        HOUSEKEEPING = "housekeeping", "Etage"
        STAFF = "staff", "Staff"
        MANAGER = "manager", "Manager"


    category = models.CharField(
        "Category",
        max_length=20,
        choices=Category.choices,
        default=Category.DEFAULT,
        help_text="Use to display certains notes for a specific group of users, by default messages are shown to everyone"
    )
    content = models.CharField(
        max_length=3000, null=True, blank=True, verbose_name="Contenu du message"
    )
    is_done = models.BooleanField(
        default=False,
        help_text="If set to true the note is mark as done and display a different design",
    )
    is_pinned = models.BooleanField(
        default=False,
        help_text="If set to true the note is mark as pinned and show on the dashboard",
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
