"""
This app is a bit unique in the sense that it does 
only one thing, returning all of the paths from each
app for the Front Desk application, no logic or data 
are stored in the `api` application
"""
from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = "frontdesk.api"
