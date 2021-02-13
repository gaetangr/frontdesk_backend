""" Serializer for the users application"""

from rest_framework import serializers

from frontdesk.properties.models import Property
from frontdesk.users.models import User


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

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
