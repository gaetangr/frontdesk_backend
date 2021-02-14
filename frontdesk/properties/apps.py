"""
All the information and modules related to the properties app
can be found below, in each of the given file a brief docstring
will give you a quick description of what the module does and 
where to find related logic and data.

- The endpoint are defined in the `properties.urls.py` module

- The logic are defined in the `properties.views.py` module

- The serializer are defined in the `properties.serializer.py` module

- The signals are defined in the `properties.signals.py` module

- The behiavors of the data are defined in the `properties.models.py` module

"""
from django.apps import AppConfig


class PropertiesConfig(AppConfig):
    name = "frontdesk.properties"
    verbose_name = " Établissement"

    def ready(self):
        """ Set the app to receive a given signal when a instance is created """
        import frontdesk.properties.signals  # noqa
