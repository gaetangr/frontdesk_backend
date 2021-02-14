"""
Admin interface for administrators 
-------------------------------------
This module will return the data reads 
from the model and display in a nice interface.

Front Desk use two instance of the admin interface
one is for the client, one for the administrators.
"""
from django.contrib import admin

from frontdesk.notification.models import Notification


admin.site.register(Notification)
