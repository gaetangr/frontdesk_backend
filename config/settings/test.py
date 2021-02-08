""" Settings so github workflow run with no trouble """
import os

from .base import *


ALLOWED_HOSTS = ["*"]
SECRET_KEY = "something"
DEBUG = False


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    },
}
