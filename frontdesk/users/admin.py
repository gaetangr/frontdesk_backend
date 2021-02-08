from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.models import SocialToken
from django.contrib import admin
from django.contrib.auth.models import User

from .models import Profile


# Cleaning admin panel
admin.site.unregister(SocialApp)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialToken)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user",)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    admin.site.unregister(User)
    list_display = ["username", "date_joined", "last_login"]
