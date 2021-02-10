from allauth.socialaccount.models import EmailAddress
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.models import SocialToken
from django.contrib import admin
from django.contrib.auth.models import User

from .models import User


# Cleaning admin panel
admin.site.unregister(SocialApp)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialToken)
admin.site.unregister(EmailAddress)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "date_joined", "last_login"]
