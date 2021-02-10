# flake8: noqa
""" Unit tests related to property/views"""
from frontdesk.users.models import User
from django.urls import reverse
from frontdesk.properties.models import Property
import pytest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory


@pytest.fixture
def api_client():
    """Fixture to to create mock Request objects for use in testing"""
    from rest_framework.test import APIClient

    return APIClient()


@pytest.mark.django_db
def test_if_property_create_endpoint_return_success(api_client):
    """ If property is created reponse should return a 201 created """
    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("property-list-create")
    response = api_client.post(url, {"name": "Overlook Hotel", "collaborator": user.pk})
    assert response.status_code == 201


@pytest.mark.django_db
def test_if_property_list_endpoint_return_content_for_request_user(api_client):
    """ If property list endpoint is access by request user, should return property content """

    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("property-list-create")
    response = api_client.get(url)
    assert response.data[0]["name"] == property.name
