""" Serializer for the workspace application"""

from rest_framework import serializers
from datetime import datetime
from frontdesk.workspace.models import Comment, Notebook, Workspace
from django.contrib.auth.models import User


class WorkspaceSerializer(serializers.ModelSerializer):
    """ WorkspaceSerialize that return JSON content  """
 
    class Meta:
        model = Workspace
        fields = ("property", "name", "slug")


class NotebookSerializer(serializers.ModelSerializer):
    """ NotebookSerialize that return JSON content  """
    username = serializers.SerializerMethodField('is_named_bar')

    def is_named_bar(self, foo):
        user = User.objects.get(pk=foo.author.pk)
        return user.username
    class Meta:
        model = Notebook
        fields = ["id", "workspace", "content", "author", "is_done", "created", "modified", "username" ]


class CommentSerializer(serializers.ModelSerializer):
    """ CommentSerialize that return JSON content  """

    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = ["notebook", "content", ]

