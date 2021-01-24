""" Api views and logic for the front desk application """

from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import AllowAny

from frontdesk.property.models import Property
from frontdesk.property.permissions import IsMember
from frontdesk.users.models import User
from frontdesk.users.permissions import IsRequestUser
from frontdesk.workspace.models import Comment, Notebook, Workspace
from frontdesk.workspace.permissions import IsAuthor, IsPropertyMember

from .serializers import (CommentSerializer, FrontDeskSerializer,
                          NotebookSerializer, PropertySerializer,
                          UserSerializer, WorkspaceSerializer)

# GENERAL API VIEWS
# ------------------------------------------------------------------------------


class FrontDeskDetail(generics.ListAPIView):
    """Api View that return stats related to Front Desk"""

    serializer_class = FrontDeskSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)


# WORKSPACE API VIEWS
# ------------------------------------------------------------------------------


class WorkspaceDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a workspace object"""

    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (IsPropertyMember,)


# USER API VIEWS
# ------------------------------------------------------------------------------


class UserListCreate(generics.ListCreateAPIView):
    """ Api view that display users and allow to create one """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""

    serializer_class = UserSerializer
    permission_classes = (IsRequestUser,)

    def get_queryset(self):
        """
        This view should return the user detail only
        for the currently authenticated user.
        """
        user = self.request.user
        return get_user_model().objects.filter(pk=user.pk)


# NOTEBOOK API VIEWS
# ------------------------------------------------------------------------------


class NotebookCreate(generics.CreateAPIView):
    """ Api allow user to create a notebook for a workspace """

    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer


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


class NotebookDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a notebook object"""

    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (IsAuthor,)


# COMMENTS API VIEWS
# ------------------------------------------------------------------------------


class CommentListCreate(generics.CreateAPIView):
    """ Api allow user to create a comment for a notebook """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


# PROPERTY API VIEWS
# ------------------------------------------------------------------------------


class PropertyListCreate(generics.ListCreateAPIView):
    """Api view that handle the creation of a property object"""

    serializer_class = PropertySerializer

    def get_queryset(self):
        """
        This view should return a list of all the properties
        for the currently authenticated user.
        """
        user = self.request.user
        return Property.objects.filter(collaborator=user)


class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (IsMember,)
