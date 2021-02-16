# flake8: noqa
""" Unit tests related to users/views"""
from django.urls import reverse
import pytest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory

from frontdesk.properties.models import Property
from frontdesk.users.models import User


@pytest.fixture
def api_client():
    """Fixture to to create mock Request objects for use in testing"""
    from rest_framework.test import APIClient

    return APIClient()


@pytest.mark.django_db
def test_user_detail_request_is_successfull(api_client):
    """ If client provide authorize token, it should access detail page """
    user = User.objects.create_user(username="gaetanaaa")
    token = Token.objects.create(user=user)  # Create token to authenticate user
    api_client.credentials(
        HTTP_AUTHORIZATION="Token " + token.key
    )  # pass token to http header
    url = reverse("users-detail", kwargs={"pk": user.pk})
    response = api_client.get(url)
    assert response.data["id"] == user.pk
    assert response.data["username"] == user.username
    assert response.status_code == 200


@pytest.mark.django_db
@pytest.mark.parametrize(
    "path_to_test",
    [
        "property-list-create",
        "notebook-create",
        "comment-create",
        "document-list",
        "notification-list",
    ],
)
def test_anonymous_user_is_forbidden_is_not_authenticated(api_client, path_to_test):
    """ If user is not authenticated, a list of given endpoint should not be accessible """
    url = reverse(path_to_test)
    response = api_client.get(url)
    assert response.status_code == 403  # forbidden


@pytest.mark.django_db
def test_if_user_create_endpoint_return_success(api_client):
    """ If client register, reponse should return a 201 created """
    url = reverse("rest_register")
    response = api_client.post(
        url,
        {
            "username": "Gaetan",
            "email": "hello@gaetangr.me",
            "password1": "you-will-never-guess",
            "password2": "you-will-never-guess",
        },
    )
    assert response.status_code == 201


@pytest.mark.django_db
def test_if_token_is_generated_after_registration(api_client):
    """ If client register, reponse should return a key use for token authentication"""
    url = reverse("rest_register")
    response = api_client.post(
        url,
        {
            "username": "Gaetan",
            "email": "hello@gaetangr.me",
            "password1": "you-will-never-guess",
            "password2": "you-will-never-guess",
        },
    )
    assert response.data["key"]


@pytest.mark.django_db
def test_if_users_list_endpoint_return_200(api_client):
    """ If users list endpoint is access by request user, should return property content """

    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("users-detail", args=[user.pk])
    response = api_client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_if_users_list_endpoint_return_content_for_request_user(api_client):
    """ If users list endpoint is access by request user, should return property content """

    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("users-detail", args=[user.pk])
    response = api_client.get(url)
    assert response.data["username"] == user.username
    assert response.data["id"] == user.pk


@pytest.mark.django_db
def test_if_users_create_is_not_staff_or_super_user(api_client):
    """ If users list endpoint is access by request user, should return false for staff and admin """

    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("users-detail", args=[user.pk])
    response = api_client.get(url)
    assert response.data["is_staff"] == False
    assert response.data["is_admin"] == False


@pytest.mark.django_db
def test_if_user_create_endpoint_return_success(api_client):
    """ If property is created reponse should return a 201 created """
    url = reverse("users-list")
    response = api_client.post(url, {"username": "gaetan", "password": "some-password"})
    assert response.status_code == 201


@pytest.mark.django_db
def test_if_user_create_endpoint_return_token_and_id(api_client):
    """ If property is created reponse should return a 201 created """
    url = reverse("users-list")
    response = api_client.post(url, {"username": "gaetan", "password": "some-password"})
    assert len(response.data) == 2


@pytest.mark.django_db
def test_if_users_endpoint_return_content_for_request_user(api_client):
    """ If users list endpoint is access by request user, should return property content """

    user = User.objects.create_user(username="gaetan")
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("users-list")
    response = api_client.get(url)
    assert response.data[0]["username"] == user.username
    assert response.data[0]["id"] == user.pk


# Extra tests to assert some pages return 200 response and that admin page are
# not available for regular users
# ------------------------------------------------------------------------------


def test_if_a_superuser_can_access_administration_panel(admin_client):
    """Test if a superuser can access the administration panel while being login
    :param admin_client: An instance of a superuser, with username “admin” and password “password” to test admin .
    """
    response = admin_client.get("/admin/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_if_an_user_cant_access_administration_panel(client):
    """Test if a none superuser is fordbiden to access to the administration panel while being login
    :param client: An instance of a django.test.Client with no superuser privilegies
    """
    response = client.get("/admin/")
    assert response.status_code != 200


def test_if_a_superuser_can_access_custom_administration_panel(admin_client):
    """Test if a superuser can access the administration panel while being login
    :param admin_client: An instance of a superuser, with username “admin” and password “password” to test admin .
    """
    response = admin_client.get("/admin-manager/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_if_an_user_cant_access_custom_administration_panel(client):
    """Test if a none superuser is fordbiden to access to the administration panel while being login
    :param client: An instance of a django.test.Client with no superuser privilegies
    """
    response = client.get("/admin-manager/")
    assert response.status_code != 200
