""" Serializer for the front desk application"""

from rest_framework import serializers

from frontdesk.properties.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Notebook


# This class is exclude from coverage report as queryset
# are already tested y the Django team
class FrontDeskSerializer(serializers.Serializer):  # pragma: no cover
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
