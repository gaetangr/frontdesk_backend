from frontdesk.properties.models import Property
import pytest


@pytest.mark.django_db
def test__str__():
    """If a property object is created, it should return the object with name"""
    property = Property.objects.create(name="Ibis")
    assert property.__str__() == property.name
    assert str(property) == property.name
