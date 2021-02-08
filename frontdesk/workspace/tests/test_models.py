from django.contrib.auth.models import User
import pytest

from frontdesk.property.models import Property
from frontdesk.workspace.models import Comment
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.models import Workspace


@pytest.mark.django_db
def test__str__workspace():
    """If a workspace is created, should return instance with title as str"""

    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property, name="Accor")

    assert workspace.__str__() == workspace.name
    assert str(workspace) == workspace.name


@pytest.mark.django_db
def test__str__notebook():
    """If a notebook is created, should return instance with content as str"""

    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property, name="Accor")
    notebook = Notebook.objects.create(
        workspace=workspace, author=user, content="Something"
    )

    assert notebook.__str__() == notebook.content
    assert str(notebook) == notebook.content


@pytest.mark.django_db
def test__str__comment():
    """If a comment is created, should return instance with content as str"""

    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")
    property = Property.objects.create(name="Overlook")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property, name="Accor")
    notebook = Notebook.objects.create(
        workspace=workspace, author=user, content="Something"
    )
    comment = Comment.objects.create(notebook=notebook, author=user, content="Something")

    assert comment.__str__() == comment.content
    assert str(comment) == comment.content
