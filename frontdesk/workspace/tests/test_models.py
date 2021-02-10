from frontdesk.users.models import User
from frontdesk.properties.models import Property
import pytest

from frontdesk.workspace.models import Comment
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.models import Workspace


@pytest.mark.django_db
def test__str__workspace():
    """If a workspace is created, should return instance with title as str"""

    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")
    property = Property.objects.create(name="Ovaerlook 44")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property)

    assert workspace.__str__() == workspace.property.name
    assert str(workspace) == workspace.property.name


@pytest.mark.django_db
def test__str__notebook():
    """If a notebook is created, should return instance with content as str"""

    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")
    property = Property.objects.create(name="Overlook 3")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property)
    notebook = Notebook.objects.create(
        workspace=workspace, author=user, content="Something"
    )

    assert notebook.__str__() == notebook.content
    assert str(notebook) == notebook.content


@pytest.mark.django_db
def test__str__comment():
    """If a comment is created, should return instance with content as str"""

    user = User.objects.create_user(username="Gaetan", password="you-will-never-guess")
    property = Property.objects.create(name="Overlook 2")
    property.collaborator.add(user)
    workspace = Workspace.objects.create(property=property)
    notebook = Notebook.objects.create(
        workspace=workspace, author=user, content="Something"
    )
    comment = Comment.objects.create(notebook=notebook, author=user, content="Something")

    assert comment.__str__() == comment.content
    assert str(comment) == comment.content
