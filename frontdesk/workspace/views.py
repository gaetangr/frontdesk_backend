""" views for the workspace app """

from rest_framework import generics

from frontdesk.property.models import Property
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
    """Api View that allow user to update, delete or retrieve a workspace object"""

    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsPropertyMember,)


workspace_list_create_view = WorkspaceListCreate.as_view()


class WorkspaceDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a workspace object"""

    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsPropertyMember,)


workspace_detail_view = WorkspaceDetail.as_view()

# NOTEBOOK API VIEWS
# ------------------------------------------------------------------------------


class NotebookCreate(generics.CreateAPIView):
    """ Api allow user to create a notebook for a workspace """

    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer


notebook_create_view = NotebookCreate.as_view()


class NotebookList(generics.ListAPIView):
    """Api View that allow user to update, delete or retrieve a notebook object"""

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
    """Api View that allow user to update, delete or retrieve a notebook object"""

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
    """Api View that allow user to update, delete or retrieve a notebook object"""

    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (IsAuthor,)


notebook_detail_view = NotebookDetail.as_view()

# COMMENTS API VIEWS
# ------------------------------------------------------------------------------


class CommentListCreate(generics.CreateAPIView):
    """ Api allow user to create a comment for a notebook """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


comment_detail_view = CommentListCreate.as_view()
