from django.contrib import admin

from .models import Notebook, Workspace

admin.site.register(Workspace)
admin.site.register(Notebook)
