import pytest

from frontdesk.property.models import Property


@pytest.mark.django_db
def test__str__():
    """If a property object is created, it should return the object with name"""
    property = Property.objects.create(name="Overlook")
    assert property.__str__() == property.name
    assert str(property) == property.name
