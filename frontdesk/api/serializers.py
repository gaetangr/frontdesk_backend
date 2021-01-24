""" Serializer for the front desk application"""

from rest_framework import serializers

from frontdesk.property.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Comment, Notebook, Workspace


class FrontDeskSerializer(serializers.Serializer):
    """ FrontDeskSerialize that return JSON content regardinds stats and global information  """

    user_count = serializers.SerializerMethodField("count_users")
    property_count = serializers.SerializerMethodField("count_properties")
    notebook_count = serializers.SerializerMethodField("count_notebook")

    def count_users(self, obj):
        # exclude demo account in the count of all user created
        return User.objects.all().exclude(username="Demo").count()

    def count_properties(self, obj):
        return Property.objects.all().count()

    def count_notebook(self, obj):
        return Notebook.objects.all().count()

    class Meta:
        fields = ("user_count", "property_count", "notebook_count")


class WorkspaceSerializer(serializers.ModelSerializer):
    """ WorkspaceSerialize that return JSON content  """

    class Meta:
        model = Workspace
        fields = ("property", "name")


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    class Meta:
        model = User
        fields = ("id", "username", "email")


class NotebookSerializer(serializers.ModelSerializer):
    """ NotebookSerialize that return JSON content  """

    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Notebook
        fields = ["workspace", "content", "author"]


class CommentSerializer(serializers.ModelSerializer):
    """ CommentSerialize that return JSON content  """

    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = ["workspace", "notebook", "content", "author"]


class PropertySerializer(serializers.ModelSerializer):
    """ PropertySerialize that return JSON content """

    collaborator_count = serializers.SerializerMethodField("count_members")

    def count_members(self, obj):
        """ Return all collaborator related to the property """
        return obj.collaborator.all().count()

    class Meta:

        model = Property
        fields = ["name", "collaborator", "slug", "collaborator_count"]
