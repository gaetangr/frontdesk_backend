from .models import Profile
from django.contrib.auth.models import User
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken
from django.contrib import admin

# Cleaning admin panel 
admin.site.unregister(SocialApp)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialToken)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', "is_manager")


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    admin.site.unregister(User)
    list_display = ["username", "date_joined", "last_login"]