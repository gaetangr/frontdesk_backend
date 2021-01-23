import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import RequestsClient


@pytest.fixture
def api_client():
    """Fixture to to create mock Request objects for use in testing"""
    from rest_framework.test import APIClient

    return APIClient()


@pytest.mark.django_db
def test_user_detail_request_is_successeeeful(api_client):
    """ If client provide authorize token, it should access detail page """
    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)  # Create token to authenticate user
    api_client.credentials(
        HTTP_AUTHORIZATION="Token " + token.key
    )  # pass token to http header
    url = reverse("users-detail", kwargs={"pk": user.pk})
    response = api_client.get(url)
    assert response.data == {"id": user.pk, "username": user.username, "email": ""}
