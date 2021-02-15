import pytest

from frontdesk.properties.models import Property, Document


@pytest.mark.django_db
def test_property__str__():
    """If a property object is created, it should return the object with name"""
    properties = Property.objects.create(name="Ibis")
    assert properties.__str__() == properties.name
    assert str(properties) == properties.name


@pytest.mark.django_db
def test_document__str__():
    """If a document object is created, it should return the object with name"""
    properties = Property.objects.create(name="Ibis")
    document = Document.objects.create(properties=properties, name="Checklist", file="something.jpg")
    assert document.__str__() == document.name
    assert str(document) == document.name