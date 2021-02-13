""" Settings so github workflow run with no trouble """
import os


ALLOWED_HOSTS = ["*"]
SECRET_KEY = "something"
DEBUG = False
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.getenv("DATABASE_NAME", default=""),
        "USER": os.getenv("DATABASE_USER", default=""),
        "PASSWORD": os.getenv("DATABASE_PASSWORD", default=""),
        "HOST": "localhost",
        "PORT": "5432",
    }
}
