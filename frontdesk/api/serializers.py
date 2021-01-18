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


class Prmodel = Property(serializers.ModelSerializer):
    """ PropertySerialize that return JSON content"""
    class Meta:
        model = Property
        fields = ["name", "collaborator"]