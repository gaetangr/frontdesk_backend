""" Serializer for the users application"""

from rest_framework import serializers

from frontdesk.users.models import User


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    # Custom serializers

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "email",
            "last_name",
            "title",
            "note",
        )


class CollaboratorSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    class Meta:
        model = User
        fields = (
            "first_name",
            "email",
            "title",
            "last_login",
            "id",
        )


class ProfileSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    class Meta:
        model = User
        fields = "__all__"
