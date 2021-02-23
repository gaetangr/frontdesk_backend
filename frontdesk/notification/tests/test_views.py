# flake8: noqa
""" Unit tests related to notifications/views"""
from django.urls import reverse
import pytest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory

from frontdesk.notification.models import Notification
from frontdesk.properties.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Comment
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.models import Workspace


@pytest.fixture
def api_client():
    """Fixture to to create mock Request objects for use in testing"""
    from rest_framework.test import APIClient

    return APIClient()


@pytest.mark.django_db
def test_if_notification_list_endpoint_return_content_for_request_user(api_client):
    """ If notification list endpoint is access by request user, should return notification content """

    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)
    notification = Notification.objects.create(
        title="Hello Gaëtan",
        content="Some content",
        category="notification",
        receiver=user,
    )
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("notification-list")
    response = api_client.get(url)
    assert response.data[0]["title"] == notification.title
    assert response.data[0]["content"] == notification.content


@pytest.mark.django_db
def test_if_private_notification_list_endpoint_return_content_for_request_user(
    api_client,
):
    """ If private notification list endpoint is access by request user, should return notification content """

    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)
    notification = Notification.objects.create(
        title="Hello Gaëtan", content="Some content", receiver=user
    )
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("private-list")
    response = api_client.get(url)
    assert response.data[0]["title"] == notification.title
    assert response.data[0]["content"] == notification.content
