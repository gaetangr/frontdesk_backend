import pytest

from frontdesk.users.models import User


@pytest.mark.django_db
def test__str__():
    """If an user object is created, it should return the object with username"""
    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")

    assert user.__str__() == user.username
    assert str(user) == user.username
