"""
All the information and modules related to the notification app
can be found below, in each of the given file a brief docstring
will give you a quick description of what the module does and 
where to find related logic and data.

- The endpoint are defined in the `notification.urls.py` module

- The logic are defined in the `notification.views.py` module

- The serializer are defined in the `notification.serializer.py` module

- The signals are defined in the `notification.signals.py` module 

- The behiavors of the data are defined in the `notification.models.py` module

"""

from django.apps import AppConfig


class NotificationConfig(AppConfig):
    name = "frontdesk.notification"
    verbose_name = "Notifications"

    def ready(self):
        """ Set the app to receive a given signal when an instance is created """
        import frontdesk.notification.signals  # noqa
