"""
This module is responsible to return serializers for the workspace app. 
A serializer allow complex data such as querysets and 
model instances to be converted to native Python 
datatypes that can then be easily rendered into JSON.

- The endpoint are defined in the `workspace.urls.py` module

- The logic are defined in the `workspace.views.py` module

- The behiavors of the data are defined in the `workspace.models.py` module
"""


from django.contrib.auth.models import User
from rest_framework import serializers

from frontdesk.users.models import User
from frontdesk.workspace.models import Comment
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.models import Workspace


class WorkspaceSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`workspace.Workspace` into a JSON format
    """

    class Meta:
        model = Workspace
        fields = ("property",)


class NotebookSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`workspace.Notebook` into a JSON format
    """

    username = serializers.SerializerMethodField("username_field")
    username_title = serializers.SerializerMethodField("username_title_field")
    dates = serializers.SerializerMethodField("date_field")

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
        """
        Return a date with a custom
        format to be used in the front end
        """
        now = str(obj.date)
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
            "category",
            "modified",
            "username",
            "username_title",
            "dates",
            "date",
        ]


class CommentSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`workspace.Comment` into a JSON format
    """

    class Meta:
        model = Comment
        fields = [
            "notebook",
            "author",
            "created",
            "content",
        ]
