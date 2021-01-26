import pytest

from frontdesk.file.models import File
from frontdesk.property.models import Property
from django.contrib.auth.models import User


@pytest.mark.django_db
def test__str__():
    """If a file object is created, it should return the object with title"""
    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    file = File.objects.create(title="Overlook", property=property)

    assert file.__str__() == file.title
    assert str(file) == file.title
