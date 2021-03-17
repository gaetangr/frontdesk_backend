import pytest

from frontdesk.notification.models import Notification
from frontdesk.checklist.models import Task
from frontdesk.properties.models import Property


@pytest.mark.django_db
def test_checklist__str__():
    """If a checklist object is created, it should return the object with content"""
    properties = Property.objects.create(name="Ibis")
    task = Task.objects.create(content="Test notification", property=properties)
    assert task.__str__() == task.content
    assert str(task) == task.content
