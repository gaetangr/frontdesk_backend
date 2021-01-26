""" Serializer for the property application"""

from rest_framework import serializers

from frontdesk.property.models import Property, PropertyPermission


class PropertySerializer(serializers.ModelSerializer):
    """ PropertySerialize that return JSON content """

    collaborator_count = serializers.SerializerMethodField("count_members")

    def count_members(self, obj):
        """ Return all collaborator related to the property """
        return obj.collaborator.all().count()

    class Meta:

        model = Property
        fields = ["name", "collaborator", "slug", "collaborator_count"]


class PropertyPermissionSerializer(serializers.ModelSerializer):
    """ PropertySerialize that return JSON content """

    class Meta:

        model = PropertyPermission
        fields = ["is_admin", "is_staff"]
