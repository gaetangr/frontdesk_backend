from django.contrib import admin
from .models import Notebook, Workspace, Comment
from django.utils.html import format_html

def nbr_message(obj):
    return format_html(
            f'<strong>{obj.notes.all().count()}</strong>')

nbr_message.short_description = 'Nombre de message'


@admin.register(Workspace)
class WorkspaceAdmin(admin.ModelAdmin):
    actions_on_bottom = True
    list_display = ('name', 'created', nbr_message)
    readonly_fields = ["name"]
    


admin.site.register(Notebook)
admin.site.register(Comment)

