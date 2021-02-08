""" Serializer for the users application"""

from rest_framework import serializers

from frontdesk.users.models import Profile
from frontdesk.users.models import User


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    # Custom serializers
    title = serializers.SerializerMethodField("title_field")
    bio = serializers.SerializerMethodField("bio_field")
    linkedin = serializers.SerializerMethodField("linkedin_field")
    note = serializers.SerializerMethodField("note_field")
    phone_number = serializers.SerializerMethodField("phone_field")

    def bio_field(self, obj):
        """ Add a custom field serializer that return the biography of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.bio

    def title_field(self, obj):
        """ Add a custom field serializer that return the title of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.title

    def linkedin_field(self, obj):
        """ Add a custom field serializer that return the linkeidn url of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.linkedin

    def note_field(self, obj):
        """ Add a custom field serializer that return the private notes of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.note

    def phone_field(self, obj):
        """ Add a custom field serializer that return the private notes of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.phone_number

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "email",
            "phone_number",
            "last_name",
            "title",
            "bio",
            "linkedin",
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
