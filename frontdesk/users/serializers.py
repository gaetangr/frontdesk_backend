""" Serializer for the users application"""

from rest_framework import serializers

from frontdesk.users.models import Profile
from frontdesk.users.models import User


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    # Custom serializers
    title = serializers.SerializerMethodField("title_field")
    note = serializers.SerializerMethodField("note_field")

    def title_field(self, obj):
        """ Add a custom field serializer that return the title of user """
        user = Profile.objects.get(user=obj.pk)
        return user.title

    def note_field(self, obj):
        """ Add a custom field serializer that return the private notes of user """
        user = Profile.objects.get(user=obj.pk)
        return user.note

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "email",
            "last_name",
            "title",
            "note",
        )


class CollaboratorSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    # Custom serializers
    title = serializers.SerializerMethodField("title_field")
    phone_number = serializers.SerializerMethodField("phone_number_field")
    request = serializers.SerializerMethodField("request_field")

    def phone_number_field(self, obj):
        """ Add a custom field serializer that return the phone number of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.phone_number

    def title_field(self, obj):
        """ Add a custom field serializer that return the title of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.title

    def request_field(self, obj):
        """ Add a custom field serializer that return the linkeidn url of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.request

    class Meta:
        model = User
        fields = (
            "first_name",
            "email",
            "title",
            "request",
            "phone_number",
            "last_login",
            "id",
        )


class ProfileSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    class Meta:
        model = Profile
        fields = "__all__"
