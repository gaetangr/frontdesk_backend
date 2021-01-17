from django.contrib import admin

from .models import Property


def nbr_message(obj):
    return obj.collaborator.all().count()
nbr_message.short_description = 'Nombre de membres'


@admin.register(Property)
class WorkspaceAdmin(admin.ModelAdmin):
    list_display = ('name', 'created', nbr_message)

    
