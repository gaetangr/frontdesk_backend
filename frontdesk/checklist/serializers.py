"""
This module is responsible to return serializers for the checklist app. 
A serializer allow complex data such as querysets and 
model instances to be converted to native Python 
datatypes that can then be easily rendered into JSON.

- The endpoint are defined in the `checklist.urls.py` module

- The logic are defined in the `checklist.views.py` module

- The signals are defined in the `checklist.signals.py` module 

- The behiavors of the data are defined in the `checklist.models.py` module
"""

from rest_framework import serializers

from frontdesk.checklist.models import Task


class TaskSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`checklist.Task` into a JSON format
    """

    class Meta:

        model = Task
        fields = ["content", "category", "is_done"]
