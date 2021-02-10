""" Serializer for the workspace application"""


from django.contrib.auth.models import User
from rest_framework import serializers

from frontdesk.users.models import User
from frontdesk.workspace.models import Comment
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.models import Workspace


class WorkspaceSerializer(serializers.ModelSerializer):
    """ WorkspaceSerializer that return JSON content  """

    class Meta:
        model = Workspace
        fields = ("property",)


class NotebookSerializer(serializers.ModelSerializer):
    """ NotebookSerializer that return JSON content  """

    username = serializers.SerializerMethodField("username_field")
    username_title = serializers.SerializerMethodField("username_title_field")
    date = serializers.SerializerMethodField("date_field")

    def username_title_field(self, obj):
        """ Add a custom field serializer that return the title of user """
        try:
            user = User.objects.get(pk=obj.author.pk)
            return user.title if user.title else ""
        except AttributeError:
            return "visiteur"

    def username_field(self, obj):
        """ Add a custom field serializer that return the username of user """
        try:
            user = User.objects.get(pk=obj.author.pk)
            return user.first_name if user.first_name else ""
        except AttributeError:
            return "Anonyme"

    def date_field(self, obj):
        now = str(obj.created)
        year = now[0:4]
        month = now[5:7]
        day = now[8:10]
        return f"{day}-{month}-{year}"

    class Meta:
        model = Notebook
        fields = [
            "id",
            "workspace",
            "content",
            "author",
            "is_done",
            "is_pinned",
            "created",
            "modified",
            "username",
            "username_title",
            "date",
        ]


class CommentSerializer(serializers.ModelSerializer):
    """ CommentSerializer that return JSON content  """

    class Meta:
        model = Comment
        fields = [
            "notebook",
            "content",
        ]
