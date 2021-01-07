""" Unit tests related to users/views """

import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_if_faq_views_is_successful(client):
    """Test if the FAQ views return a 200 response """

    url = reverse("faq_frontdesk")
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_if_cgu_views_is_successful(client):
    """Test if the CGU views return a 200 response """

    url = reverse("cgu_frontdesk")
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_if_login_views_is_successful(client):
    """Test if the Login views return a 200 response """

    url = reverse("account_login")
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.parametrize(
    "path_to_test",
    [
        "account_edit",
        "account_change_username",
        "account_delete",
        "account_change_username",
    ],
)
def test_if_views_with_authenticated_client_is_successful(
    client, django_user_model, path_to_test
):
    """Test if views related to an authenticated user return 200 response

    :param path_to_test: Pytest fixture to test multiples arguments
    """
    username = "Gaëtan"
    password = "you-will-never-guess"
    user = django_user_model.objects.create_user(username=username, password=password)
    client.force_login(user)
    url = reverse(path_to_test)
    response = client.get(url)
    assert response.status_code == 200


def test_if_a_superuser_can_access_administration_panel(admin_client):
    """Test if a superuser can access the administration panel while being login

    :param admin_client: An instance of a superuser, with username “admin” and password “password” to test admin .
    """
    response = admin_client.get("/aw4pnd17tz&-78-admin/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_if_an_user_c_access_administration_panel(client):
    """Test if a none superuser is fordbiden to access to the administration panel while being login

    :param client: An instance of a django.test.Client with no superuser privilegies
    """
    response = client.get("/aw4pnd17tz&-78-admin/")
    assert response.status_code != 200
