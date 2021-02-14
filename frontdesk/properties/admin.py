"""
Admin interface for administrators 
-------------------------------------
This module will return the data reads 
from the model and display in a nice interface.

Front Desk use two instance of the admin interface
one is for the client, one for the administrators.
"""
from django.contrib import admin
from django.contrib import messages
from django.utils.translation import ngettext

from .models import Property


def nbr_message(obj):
    """ custom function to count members of given property """
    return obj.collaborator.all().count()


nbr_message.short_description = "Nombre de membres"


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    """ Custom property admin to display custom fields and methods """

    def make_premium(self, request, queryset):
        """ custom method to activate premium on a given property """
        if queryset.filter(is_premium=True):
            self.message_user(request, "Already premium", messages.ERROR)
        else:
            updated = queryset.update(is_premium=True)
            self.message_user(
                request,
                ngettext(
                    "%d property was successfully marked as premium.",
                    "%d properties were successfully marked as premium.",
                    updated,
                )
                % updated,
                messages.SUCCESS,
            )

    make_premium.short_description = "Activate premium"
