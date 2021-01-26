# flake8: noqa
""" Unit tests related to workspace/views"""
import pytest
from django.urls import reverse
import pytest
from django.urls import reverse
from frontdesk.property.models import Property
from frontdesk.workspace.models import Workspace, Notebook, Comment
from rest_framework.test import APIRequestFactory
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    """Fixture to to create mock Request objects for use in testing"""
    from rest_framework.test import APIClient

    return APIClient()


@pytest.mark.django_db
def test_if_notebook_create_endpoint_return_success(api_client):
    """ If notebook is created reponse should return a 201 created """
    
    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property, name="Overlook")
    token = Token.objects.create(user=user)
    api_client.credentials(
        HTTP_AUTHORIZATION="Token " + token.key
    ) 
    url = reverse("notebook-create")
    response = api_client.post(url, {"content": "Overlook Hotel", "author": user.pk, "workspace": workspace.pk})
    assert response.status_code == 201

@pytest.mark.django_db
def test_if_comment_create_endpoint_return_success(api_client):
    """ If comment is created reponse should return a 201 created """
    
    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property, name="Overlook")
    notebook = Notebook.objects.create(workspace=workspace, author=user, content="Test")
    token = Token.objects.create(user=user)
    api_client.credentials(
        HTTP_AUTHORIZATION="Token " + token.key
    ) 
    url = reverse("comment-create")
    response = api_client.post(url, {"content": "Overlook Hotel", "notebook": notebook.pk, "author": user.pk, "workspace": workspace.pk})
    assert response.status_code == 201

@pytest.mark.django_db
def test_if_workspace_create_endpoint_return_success(api_client):
    """ If workspace is created reponse should return a 201 created """
    
    user = User.objects.create_user(username="gaetan")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property, name="Overlook")
    token = Token.objects.create(user=user)
    api_client.credentials(
        HTTP_AUTHORIZATION="Token " + token.key
    ) 
    url = reverse("workspace-create")
    response = api_client.post(url, {"property": property.pk, "name": "Overlook",})
    assert response.status_code == 201