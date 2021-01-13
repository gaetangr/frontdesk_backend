from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = "frontdesk.users"

    def ready(self):
        import frontdesk.users.signals  # noqa
