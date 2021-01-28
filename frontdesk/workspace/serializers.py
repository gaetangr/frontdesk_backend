""" Serializer for the workspace application"""

from rest_framework import serializers
from datetime import datetime
from frontdesk.workspace.models import Comment, Notebook, Workspace


class WorkspaceSerializer(serializers.ModelSerializer):
    """ WorkspaceSerialize that return JSON content  """
    notebook = serializers.SerializerMethodField('is_named_bar')

    def is_named_bar(self, foo):
        return foo.name == "bar"
    class Meta:
        model = Workspace
        fields = ("property", "name", "slug")


class NotebookSerializer(serializers.ModelSerializer):
    """ NotebookSerialize that return JSON content  """

    class Meta:
        model = Notebook
        fields = ["workspace", "content", "author", "is_done", "created", "modified", ]


class CommentSerializer(serializers.ModelSerializer):
    """ CommentSerialize that return JSON content  """

    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = ["notebook", "content", ]

