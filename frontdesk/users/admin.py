"""
Admin interface for administrators 
-------------------------------------
This module will return the data reads 
from the model and display in a nice interface.

Front Desk use two instance of the admin interface
one is for the client, one for the administrators.
"""
from allauth.socialaccount.models import EmailAddress
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.models import SocialToken
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.models import User

from .models import User


# Cleaning admin panel
admin.site.unregister(SocialApp)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialToken)
admin.site.unregister(EmailAddress)
admin.site.unregister(Group)


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ["username", "date_joined", "last_login"]
