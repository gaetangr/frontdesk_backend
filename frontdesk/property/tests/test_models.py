import pytest
from ..models import Property
from uuid import uuid4

@pytest.fixture
def property():
    """Create a new property 
    Returns:
        class: Return property object
    """
    property = Property.objects.create(name="Overlook")
    return property
    
@pytest.mark.django_db
def test_property_is_created_and_return_name(property):
    """ When a property is created, it should return the title """
    assert str(property) == property.name

@pytest.mark.django_db
def test_if_slug_is_matching_property_name_and_is_created(property):
    """ When a property is created, slug is auto created and should match property name """
    assert len(property.slug) != 0
    assert property.slug == str(property.name).lower()
