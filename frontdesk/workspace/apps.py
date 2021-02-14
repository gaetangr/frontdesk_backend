"""
All the information and modules related to the workspace app
can be found below, in each of the given file a brief docstring
will give you a quick description of what the module does and 
where to find related logic and data.

- The endpoint are defined in the `workspace.urls.py` module

- The logic are defined in the `workspace.views.py` module

- The serializer are defined in the `workspace.serializer.py` module

- The behiavors of the data are defined in the `workspace.models.py` module

"""
from django.apps import AppConfig


class WorkspaceConfig(AppConfig):
    name = "frontdesk.workspace"
    verbose_name = "Espace de travail"
