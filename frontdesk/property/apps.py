from django.apps import AppConfig


class PropertyConfig(AppConfig):
    name = "frontdesk.property"
    verbose_name = "Etablissement"

    def ready(self):
        """ Set the app to receive a given signal when a instance is created """
        import frontdesk.property.signals  # noqa
