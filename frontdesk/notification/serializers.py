""" Serializer for the property application"""

from rest_framework import serializers

from frontdesk.notification.models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    """ Notification serializer that return JSON content """

    class Meta:

        model = Notification
        fields = ["id", "title", "content", "is_read", "created", "category"]


class NotificationCreateSerializer(serializers.ModelSerializer):
    """ Notification serializer that return JSON content """

    class Meta:

        model = Notification
        fields = ["title", "content", "created", "category", "receiver"]
