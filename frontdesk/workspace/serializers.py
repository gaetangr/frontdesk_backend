""" Serializer for the workspace application"""


from django.contrib.auth.models import User
from rest_framework import serializers

from frontdesk.users.models import Profile, User
from frontdesk.workspace.models import Comment, Notebook, Workspace


class WorkspaceSerializer(serializers.ModelSerializer):
    """ WorkspaceSerialize that return JSON content  """

    class Meta:
        model = Workspace
        fields = ("property", "name", "slug")


class NotebookSerializer(serializers.ModelSerializer):
    """ NotebookSerialize that return JSON content  """

    username = serializers.SerializerMethodField("username_field")
    username_title = serializers.SerializerMethodField("username_title_field")

    def username_title_field(self, obj):
        """ Add a custom field serializer that return the title of user """
        # user = Profile.objects.get(pk=obj.author.pk)
        return "Réceptionniste"

    def username_field(self, obj):
        """ Add a custom field serializer that return the username of user """
        return "Gaëtan"

    class Meta:
        model = Notebook
        fields = [
            "id",
            "workspace",
            "content",
            "author",
            "is_done",
            "created",
            "modified",
            "username",
            "username_title",
        ]


class CommentSerializer(serializers.ModelSerializer):
    """ CommentSerialize that return JSON content  """

    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = [
            "notebook",
            "content",
        ]
