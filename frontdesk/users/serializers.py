"""
This module is responsible to return serializers for the users app. 
A serializer allow complex data such as querysets and 
model instances to be converted to native Python 
datatypes that can then be easily rendered into JSON.

- The endpoint are defined in the `users.urls.py` module

- The logic are defined in the `users.views.py` module

- The signals are defined in the `users.signals.py` module

- The behiavors of the data are defined in the `users.models.py` module
"""

from rest_framework import serializers

from frontdesk.properties.models import Property
from frontdesk.users.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`auth.User` into a JSON format
    """

    workspace = serializers.SerializerMethodField("workspace_field")
    # Custom serializers

    def workspace_field(self, obj):
        """ Add a custom field serializer that return the title of user """
        try:
            properties = Property.objects.filter(collaborator=obj).first()
            return properties.workspace.pk
        except AttributeError:
            return 0

    class Meta:
        model = User
        fields = (
            "id",
            "password",
            "last_login",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "date_joined",
            "title",
            "note",
            "is_admin",
            "is_staff",
            "workspace",
        )


class CollaboratorSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`auth.User` into a JSON format
    """

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
    """
    Return a list of fields from the
    :model:`auth.User` into a JSON format
    """

    class Meta:
        model = User
        fields = "__all__"
