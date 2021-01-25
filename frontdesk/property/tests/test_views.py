# flake8: noqa
""" Unit tests related to property/views"""
import pytest
from django.urls import reverse
import pytest
from django.urls import reverse
from frontdesk.property.models import Property
from rest_framework.test import APIRequestFactory
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


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
    api_client.credentials(
        HTTP_AUTHORIZATION="Token " + token.key
    ) 
    url = reverse("property")
    response = api_client.post(url, {"name": "Overlook Hotel", "collaborator": user.pk})
    assert response.status_code == 201