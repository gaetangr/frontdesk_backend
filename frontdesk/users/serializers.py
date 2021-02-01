""" Serializer for the users application"""

from rest_framework import serializers

from frontdesk.users.models import User, Profile


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """
    title = serializers.SerializerMethodField('is_named_bar')

    def is_named_bar(self, foo):
        user = Profile.objects.get(pk=foo.pk)
        return user.title
    class Meta:
        model = User
        fields = ("id", "username","first_name","last_name", "title")


class CollaboratorSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    class Meta:
        model = User
        fields = ("username", "email", "password", "profile.is_staff")