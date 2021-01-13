from django.contrib import admin

from .models import Workspace, Notebook

admin.site.register(Workspace)
admin.site.register(Notebook)
