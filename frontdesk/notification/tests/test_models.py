import pytest

from frontdesk.notification.models import Notification
from frontdesk.users.models import User


@pytest.mark.django_db
def test_notification__str__():
    """If a notification object is created, it should return the object with name"""
    user = User.objects.create_user(username="User TEST")
    notification = Notification.objects.create(
        title="Hello", content="Test notification", receiver=user
    )
    assert notification.__str__() == notification.title
    assert str(notification) == notification.title
