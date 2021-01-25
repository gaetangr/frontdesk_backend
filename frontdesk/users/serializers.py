""" Serializer for the users application"""

from rest_framework import serializers

from frontdesk.users.models import User


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    class Meta:
        model = User
        fields = ("id", "username", "email")
