from autoslug import AutoSlugField
from django.db import models
from django.contrib.auth.models import User
from frontdesk.property.models import Property
from model_utils.models import TimeStampedModel

class File(TimeStampedModel):
    """Stores a file object, using TimeStampedModel to provide a self updating
    and creating field.
    """
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="property"
    )
    title = models.CharField(
        max_length=230, null=True, blank=True, verbose_name="Titre du fichier"
    )
    slug = AutoSlugField( unique=True, always_update=False, populate_from="title"
    )
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    is_planning = models.BooleanField(default=False)
    upload = models.FileField(upload_to="uploads/")

    def __str__(self):
        return self.title

