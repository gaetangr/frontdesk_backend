"""
This module is responsible to handle the logic of the `checklist` app.
Each view is a class based view with custom method that return data with 
specific permissions.

- The endpoint are defined in the `checklist.urls.py` module

- The behiavors of the data are defined in the `checklist.models.py` module

- The signals are defined in the `checklist.signals.py` module

- The serializers are defined in the `checklist.serializers.py` module 
"""
from rest_framework import generics

from frontdesk.checklist.models import Task
from frontdesk.properties.models import Property

from .serializers import TaskSerializer


# NOTIFICATION API VIEWS
# ------------------------------------------------------------------------------


class TaskList(generics.ListAPIView):
    """
    Api endpoint related to `checklist.Task`

    get:
    Return a `checklist.Task` for the related property instance.
    """

    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        This view should return a list of all the tasks
        for the currently authenticated collaborator.
        """
        user = self.request.user
        properties = Property.objects.filter(collaborator=user).first()
        return Task.objects.filter(property=properties)


task_list_view = TaskList.as_view()
