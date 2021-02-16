"""
This module is responsible to return serializers for the properties app. 
A serializer allow complex data such as querysets and 
model instances to be converted to native Python 
datatypes that can then be easily rendered into JSON.

- The endpoint are defined in the `properties.urls.py` module

- The logic are defined in the `properties.views.py` module

- The signals are defined in the `properties.signals.py` module 

- The behiavors of the data are defined in the `properties.models.py` module
"""

from rest_framework import serializers

from frontdesk.properties.models import Document
from frontdesk.properties.models import Property


class PropertySerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`properties.Property` into a JSON format
    """

    collaborator_count = serializers.SerializerMethodField("count_members")

    def count_members(self, obj):
        """
        Return all collaborator related to the property
        """
        return obj.collaborator.all().count()

    class Meta:

        model = Property
        fields = [
            "name",
            "collaborator",
            "notice",
            "collaborator_count",
        ]


class DocumentSerializer(serializers.ModelSerializer):
    """
    Return a list of fields from the
    :model:`properties.Document` into a JSON format
    """

    class Meta:

        model = Document
        fields = [
            "name",
            "created",
            "file",
            "category",
        ]
