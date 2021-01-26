import pytest

from frontdesk.users.models import Profile
from django.contrib.auth.models import User


@pytest.mark.django_db
def test__str__():
    """If an user object is created, a profil is linked and should return username as str"""
    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")
    profile = Profile.objects.get(user=user)

    assert profile.__str__() == profile.user.username
    assert str(profile) == profile.user.username
