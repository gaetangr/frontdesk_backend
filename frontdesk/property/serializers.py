""" Serializer for the property application"""

from rest_framework import serializers

from frontdesk.property.models import Property
from frontdesk.property.models import PropertyPermission
from frontdesk.workspace.models import Workspace


class PropertySerializer(serializers.ModelSerializer):
    """ PropertySerialize that return JSON content """

    collaborator_count = serializers.SerializerMethodField("count_members")
    username = serializers.SerializerMethodField("is_named_bar")

    def is_named_bar(self, obj):
        workspace = Workspace.objects.filter(property=obj).first()
        return workspace.name

    def count_members(self, obj):
        """ Return all collaborator related to the property """
        return obj.collaborator.all().count()

    class Meta:

        model = Property
        fields = ["name", "collaborator", "slug", "collaborator_count", "username"]


class PropertyPermissionSerializer(serializers.ModelSerializer):
    """ PropertySerialize that return JSON content """

    class Meta:

        model = PropertyPermission
        fields = ["is_admin", "is_staff"]
