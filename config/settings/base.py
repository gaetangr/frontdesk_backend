"""
Base settings to be extended for production, test and local.
Settings common to all instances of the project.
"""
from pathlib import Path

import environ


REDIRECT_WEBSITE = "localhost:3000"

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent
APPS_DIR = BASE_DIR / "frontdesk"

env = environ.Env()

ENV_FILE = BASE_DIR / ".env"
if Path(ENV_FILE).exists():
    # OS environment variables take precedence over variables from .env
    env.read_env(str(ENV_FILE))

# GENERAL
# ------------------------------------------------------------------------------


DEBUG = env.bool("DJANGO_DEBUG", False)

ALLOWED_HOSTS = ["*"]

LANGUAGE_CODE = "fr"

TIME_ZONE = "CET"  # UTC -> CET pour heure de Paris

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Definir les langues disponible


def gettext(x):
    return x


LANGUAGES = (
    ("fr", gettext("French")),
    ("en", gettext("English")),
)

SITE_ID = 1

LOCALE_PATHS = [str(BASE_DIR / "locale")]

INTERNAL_IPS = [
    "127.0.0.1",
]


# APPS
# ------------------------------------------------------------------------------

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.humanize",
    "django.contrib.admindocs",
    "django.contrib.sites",
]

THIRD_PARTY_APPS = [
    # Authentification
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    # API / DRF
    "rest_framework",
    "dj_rest_auth",
    "rest_framework.authtoken",
    "drf_yasg",
    "corsheaders",
]

LOCAL_APPS = [
    "frontdesk.users.apps.UsersConfig",
    "frontdesk.workspace.apps.WorkspaceConfig",
    "frontdesk.api.apps.ApiConfig",
    "frontdesk.properties.apps.PropertiesConfig",
    "frontdesk.notification.apps.NotificationConfig",
    "frontdesk.checklist.apps.ChecklistConfig",
]

INSTALLED_APPS = (
    DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS
)  # when adding new apps, add them in the correct list


# MIDDLEWARE
# ------------------------------------------------------------------------------

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.common.BrokenLinkEmailsMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# TEMPLATES
# ------------------------------------------------------------------------------
TEMPLATES = [
    {
        # https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        # https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
        "DIRS": [str(APPS_DIR / "templates")],
        "OPTIONS": {
            "loaders": [
                "django.template.loaders.filesystem.Loader",
                "django.template.loaders.app_directories.Loader",
            ],
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.i18n",
                "django.template.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# DATABASES
# ------------------------------------------------------------------------------
DATABASES = {
    # DATABASE_URL=postgres://user:password@hostname_or_ip:port/database_name, file is .env
    "default": env.db(
        "DATABASE_URL",
        default="postgres:///frontdesk",
    ),
}

# Overwrite Django's default behavior with atomic transaction so it guarantees integrity of the database:
# https://docs.djangoproject.com/en/3.1/topics/db/transactions/
DATABASES["default"]["ATOMIC_REQUESTS"] = True


# URLS
# ------------------------------------------------------------------------------
ROOT_URLCONF = "config.urls"
# https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = "config.wsgi.application"

# PASSWORDS
# ------------------------------------------------------------------------------
# Argon2 is not the default for Django because it requires a third-party library. The Password Hashing Competition panel,
# however, recommends immediate use of Argon2 rather than the other algorithms supported by Django.

PASSWORD_HASHERS = [
    # https://docs.djangoproject.com/en/dev/topics/auth/passwords/#using-argon2-with-django
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# EMAIL
# ------------------------------------------------------------------------------
# print emails to the console for local use
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = ""
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""

# ADMIN
# ------------------------------------------------------------------------------
# Django Admin URL.
ADMIN_URL = "admin/"
# https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = [("Gaëtan", "hello@gaetangr.me")]
# https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS

# STATIC
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#static-root
STATIC_ROOT = str(BASE_DIR / "staticfiles")
# https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = "/static/"
# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#std:setting-STATICFILES_DIRS
STATICFILES_DIRS = [str(APPS_DIR / "static")]
# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

# MEDIA
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = str(APPS_DIR / "media")
# https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = "/media/"

# DJANGO-ALLAUTH
# ------------------------------------------------------------------------------

ACCOUNT_FORMS = {"signup": "frontdesk.users.forms.CustomSignupForm"}
# Spécifie la méthode de connexion à utiliser
ACCOUNT_AUTHENTICATION_METHOD = "username_email"
# Url de redirection une fois que l'utilisateur est connecté
LOGIN_REDIRECT_URL = "/"
# L'utilisateur est tenu de donner une adresse email lors de sont inscription
ACCOUNT_EMAIL_REQUIRED = True
# Email unique
ACCOUNT_UNIQUE_EMAIL = True
# Détermine la date d'expiration du token de confirmation d'email
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 2
# Les utilisateurs seront automatiquement connectés une fois qu'ils auront confirmé leur adresse électronique
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = False
# Nombre de tentatives de connexion infructueuses
ACCOUNT_LOGIN_ATTEMPTS_LIMIT = 7
# Delai d'attente (en seconde) sur lequel un utilisateur ne peut pas se connecter suite à plusieurs tentatives de connexion infructueuses
ACCOUNT_LOGIN_ATTEMPTS_TIMEOUT = 300
# les utilisateurs seront automatiquement connectés une fois qu'ils auront réinitialisé leur mot de passe
ACCOUNT_LOGIN_ON_PASSWORD_RESET = True
# longueur minimale autorisée d'un nom d'utilisateur (Paramètre obligatoire)
ACCOUNT_USERNAME_MIN_LENGTH = 3
# L'utilisateur doit entrer un nom d'utilisateur lors de son inscription
ACCOUNT_USERNAME_REQUIRED = True
# Une liste de noms d'utilisateur qui ne peuvent pas être utilisés
ACCOUNT_USERNAME_BLACKLIST = [
    "front-desk",
    "frontdesk",
]

# DJANGO-REST
# ------------------------------------------------------------------------------

CORS_ORIGIN_ALLOW_ALL = (
    True  # If this is used then `CORS_ORIGIN_WHITELIST` will not have any effect
)
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "https://front-desk.app",
    "https://www.front-desk.app",
]  # If this is used, then not need to use `CORS_ORIGIN_ALLOW_ALL = True`
CORS_ORIGIN_REGEX_WHITELIST = [
    "http://localhost:3000",
]


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",  # new
    ],
}


# LOGGING
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#caches
LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s "
            "%(process)d %(thread)d %(message)s"
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        }
    },
    "root": {"level": "INFO", "handlers": ["console"]},
    "loggers": {
        "django.db.backends": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        # Errors logged by the SDK itself
        "sentry_sdk": {"level": "ERROR", "handlers": ["console"], "propagate": False},
        "django.security.DisallowedHost": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
    },
}

AUTH_USER_MODEL = "users.User"
