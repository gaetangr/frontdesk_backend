import pytest

from frontdesk.users.models import User


@pytest.mark.django_db
def test__str__():
    """If an user object is created, a profil is linked and should return username as str"""
    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")
    user = User.objects.get(pk=user.pk)

    assert user.__str__() == user.username
    assert str(user) == user.username
