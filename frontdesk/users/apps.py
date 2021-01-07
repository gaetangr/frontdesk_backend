from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = "frontdesk.users"

    # Appel le ficher signials.py pour permettre la création automatique d'un profil lorsqu'un utilisateur est créé (pour les avatars)
    def ready(self):
        import frontdesk.users.signals  # noqa
