from django.contrib import admin
from django.utils.translation import ngettext
from .models import Property
from django.contrib import messages


def nbr_message(obj):
    """ custom function to count members of given property """
    return obj.collaborator.all().count()
nbr_message.short_description = 'Nombre de membres'

@admin.register(Property)
class WorkspaceAdmin(admin.ModelAdmin):
    list_display = ('name', 'created', nbr_message)
    actions = ['make_premium']

    def make_premium(self, request, queryset):
        """ custom method to activate premium on a given property """
        if queryset.filter(is_premium=True):
            self.message_user(request, "Already premium", messages.ERROR)
        else:
            updated = queryset.update(is_premium=True)
            self.message_user(request, ngettext(
                '%d property was successfully marked as premium.',
                '%d properties were successfully marked as premium.',
                updated,
            ) % updated, messages.SUCCESS)
    make_premium.short_description = "Activate premium" 

    
