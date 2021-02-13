from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = "frontdesk.users"
    verbose_name = "Utilisateurs"

    def ready(self):
        import frontdesk.users.signals  # noqa
