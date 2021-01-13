from django.apps import AppConfig


class NotificationConfig(AppConfig):
    name = "frontdesk.notification"
    verbose_name = "Notifications"
    def ready(self):
        """ Set the app to receive a given signal when a instanc is created """
        import frontdesk.notification.signals