""" Serializer for the users application"""

from rest_framework import serializers

from frontdesk.users.models import Profile, User


class UserSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    # Custom serializers
    title = serializers.SerializerMethodField("title_field")
    bio = serializers.SerializerMethodField("bio_field")
    linkedin = serializers.SerializerMethodField("linkedin_field")
    image = serializers.SerializerMethodField("image_field")
    note = serializers.SerializerMethodField("note_field")

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

    def image_field(self, obj):
        """ Add a custom field serializer that return the image url of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.image.url

    def note_field(self, obj):
        """ Add a custom field serializer that return the private notes of user """
        user = Profile.objects.get(pk=obj.pk)
        return user.note

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "title",
            "bio",
            "linkedin",
            "image",
            "note",
        )


class CollaboratorSerializer(serializers.ModelSerializer):
    """ UserSerialize that return JSON content  """

    class Meta:
        model = User
        fields = ("username", "email", "password", "profile.is_staff")
