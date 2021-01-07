"""
Production settings settings to be used for production

This is the settings file used to host front-desk live in
production server. That is, the settings
for the server that host the real live website
"""
from .base import *

ALLOWED_HOSTS = ["134.209.35.134", "front-desk.fr", "www.front-desk.fr"]

DEBUG = False

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
