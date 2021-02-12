from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from model_utils.models import TimeStampedModel

from frontdesk.properties.models import Property


User = settings.AUTH_USER_MODEL


class Workspace(TimeStampedModel):
    """
    Stores a workspace, a workspace is where members can exchange each other
    messages and many uselful information relating to their shift.
    """

    property = models.OneToOneField(
        Property,
        on_delete=models.CASCADE,
        related_name="workspace",
        help_text="Property related to the current workspace",
        verbose_name="Établissement",
    )

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.property.name

    class Meta:
        verbose_name_plural = "Espaces de travail"
        verbose_name = "Espace de travail"


class Notebook(TimeStampedModel):
    """
    Stores a note for the workspace, related to :model:`workspace.Workspace` and
    :model:`auth.User`
    """

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="notes",
        help_text="Workspace is linked to a property, the workspace is where users exchange informations",
        verbose_name="Espace de travail",
    )
    author = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name="Auteur",
        related_name="author",
    )
    date = models.DateTimeField(auto_now_add=True, null=False)
    tag_user = models.ManyToManyField(
        User,
        blank=True,
        verbose_name="Utilisateurs taggués",
        help_text="Les utilisateurs selectionnés recevront une notification",
    )

    class Meta:
        verbose_name_plural = "Messages"
        verbose_name = "Message"

    class Category(models.TextChoices):
        """ Define categories for the workspace """

        DEFAULT = "tous", "Tous"
        MAINTENANCE = "maintenance", "Maintenance"
        HOUSEKEEPING = "etage", "Étage"

    category = models.CharField(
        "Catégorie",
        max_length=20,
        choices=Category.choices,
        default=Category.DEFAULT,
        help_text="Catégories utilisées pour filtrer et associer des consignes et messages",
    )
    content = models.TextField(null=True, blank=True, verbose_name="Contenu du message")
    is_done = models.BooleanField(
        "Fait",
        default=False,
        help_text="Si la case est cochée, le message est considéré comme fait et affiche un label sur le contenu",
    )
    is_pinned = models.BooleanField(
        "Épinglé",
        default=False,
        help_text="Si la case est cochée, le message est considéré comme épinglé et affiche un label sur le contenu",
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
        Notebook,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="Message",
        help_text="Le message associé au commentaire que vous ajouter ou ",
    )
    author = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name="Auteur",
        help_text="L'auteur qui sera associé au commentaire",
    )
    content = models.TextField(
        null=True,
        blank=True,
        verbose_name="Contenu",
    )

    class Meta:
        verbose_name_plural = "Commentaires"
        verbose_name = "Commentaire"

    def __str__(self):
        """ Return instance with a human readable fashion """
        return self.content
