""" views for the workspace app """

from rest_framework import generics

from frontdesk.properties.models import Property
from frontdesk.workspace.models import Comment
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.models import Workspace

from .permissions import IsAuthor
from .permissions import IsPropertyMember
from .serializers import CommentSerializer
from .serializers import NotebookSerializer
from .serializers import WorkspaceSerializer


# WORKSPACE API VIEWS
# ------------------------------------------------------------------------------
class WorkspaceListCreate(generics.ListCreateAPIView):
    """
    Api endpoint related to :model:`workspace.Workspace`

    get:
    Return a `workspace.Workspace` for the request user.

    post:
    Create a new `workspace.Workspace` instance.
    """

    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsPropertyMember,)


workspace_list_create_view = WorkspaceListCreate.as_view()


class WorkspaceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Api endpoint related to `workspace.Workspace`

    get:
    Return a `workspace.Workspace` for the request user.

    delete:
    Delete a `workspace.Workspace` instance.

    patch:
    Update a `workspace.Workspace` instance.

    """

    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsPropertyMember,)


workspace_detail_view = WorkspaceDetail.as_view()

# NOTEBOOK API VIEWS
# ------------------------------------------------------------------------------


class NotebookCreate(generics.CreateAPIView):
    """
    Api endpoint related to `workspace.Notebook`

    post:
    Create a new `workspace.Notebook` instance.

    """

    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer


notebook_create_view = NotebookCreate.as_view()


class NotebookList(generics.ListAPIView):
    """
    Api endpoint related to `workspace.Notebook`

    get:
    Return a list of `workspace.Notebook` instance.

    """

    serializer_class = NotebookSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        """
        This view should return a list of all the notebooks
        for the currently authenticated user.
        """
        user = self.request.user
        property = Property.objects.all().filter(collaborator=user).first()
        workspace = Workspace.objects.all().filter(property=property).first()
        return Notebook.objects.all().order_by("-id").filter(workspace=workspace)


notebook_list_view = NotebookList.as_view()


class NotebookListPinned(generics.ListAPIView):
    """
    Api endpoint related to `workspace.Notebook`

    get:
    Return a list of `workspace.Notebook` is is_pinned is true.

    """

    serializer_class = NotebookSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        """
        This view should return a list of all the notebooks
        for the currently authenticated user.
        """
        user = self.request.user
        property = Property.objects.all().filter(collaborator=user).first()
        workspace = Workspace.objects.all().filter(property=property).first()
        return (
            Notebook.objects.all()
            .order_by("-id")
            .filter(
                workspace=workspace,
                is_pinned=True,
            )
        )


notebook_list_view_pinned = NotebookListPinned.as_view()


class NotebookDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Api endpoint related to `workspace.Notebook`

    get:
    Return a `workspace.Notebook` for the request user.

    delete:
    Delete a `workspace.Notebook` instance.

    patch:
    Update a `workspace.Notebook` instance.

    """

    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (IsAuthor,)


notebook_detail_view = NotebookDetail.as_view()

# COMMENTS API VIEWS
# ------------------------------------------------------------------------------


class CommentListCreate(generics.ListCreateAPIView):
    """
    Api endpoint related to `workspace.Comment`

    post:
    Create a new `workspace.Comment` instance.

    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


comment_detail_view = CommentListCreate.as_view()
