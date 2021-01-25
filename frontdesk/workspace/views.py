""" views for the workspace app """

from rest_framework import generics

from frontdesk.workspace.models import Comment, Notebook, Workspace

from .permissions import IsAuthor, IsPropertyMember
from .serializers import (CommentSerializer, NotebookSerializer,
                          WorkspaceSerializer)

# WORKSPACE API VIEWS
# ------------------------------------------------------------------------------


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
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return Notebook.objects.filter(author=user)


notebook_list_view = NotebookList.as_view()


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
