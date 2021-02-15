# flake8: noqa
""" Unit tests related to workspace/views"""
from django.urls import reverse
import pytest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory

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
def test_if_notebook_create_endpoint_return_success(api_client):
    """ If notebook is created reponse should return a 201 created """

    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook 31")
    property.collaborator.add(user)
    workspace = Workspace.objects.get(property=property)
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("notebook-create")
    response = api_client.post(
        url, {"content": "Overlook Hotel", "author": user.pk, "workspace": workspace.pk}
    )
    assert response.status_code == 201


@pytest.mark.django_db
def test_if_comment_create_endpoint_return_success(api_client):
    """ If comment is created reponse should return a 201 created """

    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook 33")
    property.collaborator.add(user)
    workspace = Workspace.objects.get(property=property)
    notebook = Notebook.objects.create(workspace=workspace, author=user, content="Test")
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("comment-create")
    response = api_client.post(
        url,
        {
            "content": "Overlook Hotel",
            "notebook": notebook.pk,
            "author": user.pk,
        },
    )
    assert response.status_code == 201


@pytest.mark.skip(reason="no way of currently testing this")
@pytest.mark.django_db
def test_if_workspace_create_endpoint_return_success(api_client):
    """ If workspace is created reponse should return a 201 created """

    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook 35")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property)
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("workspace-list-create")
    response = api_client.post(
        url,
        {
            "property": property.pk,
        },
    )
    assert response.status_code == 201


@pytest.mark.skip(reason="no way of currently testing this")
@pytest.mark.django_db
def test_if_notebook_list_endpoint_return_content_for_request_user(api_client):
    """ If notebook list endpoint is access by request user, should return notebook content """

    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property, name="Overlook")
    notebook = Notebook.objects.create(workspace=workspace, content="Test", author=user)
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    url = reverse("notebook-list")
    response = api_client.get(url)
    assert response.data[0]["content"] == notebook.content
