from django.contrib import admin

from .models import Notebook, Workspace, Comment

admin.site.register(Workspace)
admin.site.register(Notebook)
admin.site.register(Comment)
