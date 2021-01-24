import pytest
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token


@pytest.fixture
def api_client():
    """Fixture to to create mock Request objects for use in testing"""
    from rest_framework.test import APIClient

    return APIClient()


@pytest.mark.django_db
def test_user_detail_request_is_successfull(api_client):
    """ If client provide authorize token, it should access detail page """
    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)  # Create token to authenticate user
    api_client.credentials(
        HTTP_AUTHORIZATION="Token " + token.key
    )  # pass token to http header
    url = reverse("users-detail", kwargs={"pk": user.pk})
    response = api_client.get(url)
    assert response.data == {"id": user.pk, "username": user.username, "email": ""}
    assert response.status_code == 200


@pytest.mark.django_db
@pytest.mark.parametrize(
    "path_to_test",
    [
        "property",
        "notebook-create",
        "comment-create",
    ],
)
def test_anonymous_user_is_forbidden_is_not_authenticated(api_client, path_to_test):
    """ If user is not authenticated, a list of given endpoint should not be accessible """
    url = reverse(path_to_test)
    response = api_client.get(url)
    assert response.status_code == 403  # forbidden


@pytest.mark.django_db
def test_global_endpoint_is_accessible(api_client):
    """ If user is not authenticated, a list of given endpoint should not be accessible """
    url = reverse("frontdesk")
    response = api_client.get(url)
    assert response.status_code == 200
    assert len(response.content) != 0
