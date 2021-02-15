"""
Production settings settings to be used for production

This is the settings file used to host front-desk live in
production server. That is, the settings
for the server that host the real live website
"""
import logging

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import LoggingIntegration

from .base import *



# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env("DJANGO_SECRET_KEY")
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = env.list(
    "DJANGO_ALLOWED_HOSTS", default=["front-desk.app", "46.101.63.26", "www.front-desk.app", "127.0.0.1" ]
)

# ADMIN
# ------------------------------------------------------------------------------
# Django Admin URL regex.
ADMIN_URL = "admin/"


# DATABASES
# ------------------------------------------------------------------------------
DATABASES["default"] = env.db("DATABASE_URL")  # noqa: F405
DATABASES["default"]["ATOMIC_REQUESTS"] = True  # noqa: F405
DATABASES["default"]["CONN_MAX_AGE"] = env.int(  # noqa: F405
    "CONN_MAX_AGE", default=60
)
# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
# print emails to the console for local use
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp-front-desk.alwaysdata.net"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = env(
    "EMAIL_HOST_USER",
    default="!!!SET EMAIL_HOST_USER!!!",
)
EMAIL_HOST_PASSWORD = env(
    "EMAIL_HOST_PASSWORD ",
    default="!!!SET EMAIL_HOST_PASSWORD!!!",
)

# Sentry
# ------------------------------------------------------------------------------
SENTRY_DSN = env("SENTRY_DSN")
SENTRY_LOG_LEVEL = env.int("DJANGO_SENTRY_LOG_LEVEL", logging.WARNING)

sentry_logging = LoggingIntegration(
    level=SENTRY_LOG_LEVEL,  # Capture info and above as breadcrumbs
    event_level=logging.WARNING,  # Send errors as events
)
integrations = [sentry_logging, DjangoIntegration()]
sentry_sdk.init(
    dsn=SENTRY_DSN,
    integrations=integrations,
    environment=env("SENTRY_ENVIRONMENT", default="production"),
    traces_sample_rate=env.float("SENTRY_TRACES_SAMPLE_RATE", default=0.0),
)
