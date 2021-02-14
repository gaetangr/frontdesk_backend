"""
This module is responsible to return serializers for the notification app. 
A serializer allow complex data such as querysets and 
model instances to be converted to native Python 
datatypes that can then be easily rendered into JSON.

- The endpoint are defined in the `notification.urls.py` module

- The logic are defined in the `notification.views.py` module

- The signals are defined in the `notification.signals.py` module 

- The behiavors of the data are defined in the `notification.models.py` module
"""

from rest_framework import serializers

from frontdesk.notification.models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`notification.Notification` into a JSON format
    """

    class Meta:

        model = Notification
        fields = ["id", "title", "content", "is_read", "created", "category"]


class NotificationCreateSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`notification.Notification` into a JSON format
    """

    class Meta:

        model = Notification
        fields = ["title", "content", "created", "category", "receiver"]
