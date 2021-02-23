"""
All the information and modules related to the checklist app
can be found below, in each of the given file a brief docstring
will give you a quick description of what the module does and 
where to find related logic and data.

- The endpoint are defined in the `checklist.urls.py` module

- The logic are defined in the `checklist.views.py` module

- The serializer are defined in the `checklist.serializer.py` module

- The signals are defined in the `checklist.signals.py` module 

- The behiavors of the data are defined in the `checklist.models.py` module

"""

from django.apps import AppConfig


class ChecklistConfig(AppConfig):
    name = "frontdesk.checklist"
    verbose_name = "Check-lists"
