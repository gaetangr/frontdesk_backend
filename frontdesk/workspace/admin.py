"""
Admin interface for administrators 
-------------------------------------
This module will return the data reads 
from the model and display in a nice interface.

Front Desk use two instance of the admin interface
one is for the client, one for the administrators.
"""
from django.contrib import admin
from django.utils.html import format_html

from .models import Comment
from .models import Notebook
from .models import Workspace


def nbr_message(obj):
    return format_html(f"<strong>{obj.notes.all().count()}</strong>")


nbr_message.short_description = "Nombre de messages"


@admin.register(Workspace)
class WorkspaceAdmin(admin.ModelAdmin):
    """ Custom workspace admin to display custom fields and methods """

    actions_on_bottom = True
    list_display = ("property", "created", nbr_message)


admin.site.register(Notebook)
admin.site.register(Comment)
