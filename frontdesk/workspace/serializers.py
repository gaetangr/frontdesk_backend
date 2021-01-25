""" Serializer for the workspace application"""

from rest_framework import serializers

from frontdesk.workspace.models import Comment, Notebook, Workspace


class WorkspaceSerializer(serializers.ModelSerializer):
    """ WorkspaceSerialize that return JSON content  """

    class Meta:
        model = Workspace
        fields = ("property", "name")


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
