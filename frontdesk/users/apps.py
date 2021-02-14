"""
All the information and modules related to the users app
can be found below, in each of the given file a brief docstring
will give you a quick description of what the module does and 
where to find related logic and data.

- The endpoint are defined in the `users.urls.py` module

- The logic are defined in the `users.views.py` module

- The serializer are defined in the `users.serializer.py` module

- The signals are defined in the `users.signals.py` module

- The behiavors of the data are defined in the `users.models.py` module

"""
from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = "frontdesk.users"
    verbose_name = "Utilisateurs"

    def ready(self):
        import frontdesk.users.signals  # noqa
