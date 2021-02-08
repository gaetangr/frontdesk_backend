""" Settings so github workflow run with no trouble """
import os

from .base import *


ALLOWED_HOSTS = ["*"]
SECRET_KEY = "something"
DEBUG = False
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.getenv("DATABASE_NAME", default="name"),
        "USER": os.getenv("DATABASE_USER", default="user"),
        "PASSWORD": os.getenv("DATABASE_PASSWORD", default="password"),
        "HOST": "localhost",
        "PORT": "5432",
    }
}
