from rest_framework import serializers

from frontdesk.property.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Notebook


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class NotebookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notebook
        fields = ["workspace", "content", "author"]


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"
