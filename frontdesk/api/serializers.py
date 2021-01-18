""" Serializer for the front desk application"""

from rest_framework import serializers

from frontdesk.property.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Notebook


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    class Meta:
        model = User
        fields = ("id", "username", "email")


class NotebookSerializer(serializers.ModelSerializer):
    """ NotebookSerialize that return JSON content  """

    class Meta:
        model = Notebook
        fields = ["workspace", "content", "author"]


class PropertySerializer(serializers.ModelSerializer):
    """ PropertySerialize that return JSON content """

    nbr_members = serializers.SerializerMethodField("nbr_member")

    def nbr_member(self, obj):
        return obj.collaborator.all().count()

    class Meta:

        model = Property
        fields = ["name", "collaborator", "is_premium", "nbr_members"]
