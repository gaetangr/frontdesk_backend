""" Unit tests related to models """


import pytest
from django.urls import reverse
from django.utils import timezone

from frontdesk.workspace.models import Notebook, Workspace
from frontdesk.workspace.tests.factories import WorkspaceFactory

# Data to mock login user for test
username = "Gaëtan"
password = "you-will-never-guess"


@pytest.mark.django_db
def test_if_workspace___str___method_return_correct_data():
    """Test if the ___str___ method return the correct data for the workspace model"""
    workspace = WorkspaceFactory()
    assert str(workspace) == workspace


@pytest.mark.django_db
def test_if_workspace___str___method_return_correct_data():
    """Test if the ___str___ method return the correct data for the workspace model"""
    workspace = WorkspaceFactory()
    url = workspace.get_absolute_url()
    assert url == reverse("create-workspace")


@pytest.mark.django_db
def test_if_notebook_instance_is_created(django_user_model):
    """Test if an instance of :model:`workspace.Notebook` is created in the database"""
    workspace = Workspace.objects.create(name="My awesome workspace")
    user = django_user_model.objects.create_user(username="username", password=password)
    Notebook.objects.create(
        workspace=workspace,
        author=user,
        message="My awesome message",
        date=timezone.now(),
    )
    assert Notebook.objects.count() == 1
