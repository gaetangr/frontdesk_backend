""" Settings so github workflow run with no trouble """
from .base import *
import os

ALLOWED_HOSTS = ["*"]
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = False
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.getenv("DATABASE_NAME", default="TEST"),
        "USER": os.getenv("DATABASE_USER", default="GAETAN"),
        "PASSWORD": os.getenv("DATABASE_PASSWORD", default="something"),
        "HOST": "localhost",
        "PORT": "5432",
    }
}

