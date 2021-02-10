from django.apps import AppConfig


class PropertiesConfig(AppConfig):
    name = "frontdesk.properties"
    verbose_name = "Etablissement"

    def ready(self):
        """ Set the app to receive a given signal when a instance is created """
        import frontdesk.properties.signals  # noqa
