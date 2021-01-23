""" Api views and logic for the front desk application """

from django.contrib.auth import get_user_model
from rest_framework import generics, serializers, status

from frontdesk.property.models import Property
from frontdesk.property.permissions import IsMember, IsMemberAndAdmin, IsMemberAndStaff
from frontdesk.users.models import User
from frontdesk.users.permissions import IsRequestUser
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.permissions import IsAuthor

from .serializers import NotebookSerializer, PropertySerializer, UserSerializer

# USER API VIEWS
# ------------------------------------------------------------------------------

class UserListCreate(generics.ListCreateAPIView):
    """ Api view that display users and allow to create one """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsRequestUser,)


# COLLABORATOR API VIEWS
# ------------------------------------------------------------------------------

class CollaboratorListCreate(generics.ListCreateAPIView):
    """ Api view that display users and allow to create one """

    queryset = User.objects.all()
    serializer_class = UserSerializer



class CollaboratorDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsRequestUser,)


# NOTEBOOK API VIEWS
# ------------------------------------------------------------------------------

class NotebookListCreate(generics.CreateAPIView):
    """ Api view allow user to create a notebook for a workspace """

    queryset = Notebook.objects.filter(workspace=1)
    serializer_class = NotebookSerializer


class NotebookDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a notebook object"""

    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (IsAuthor,)


# PROPERTY API VIEWS
# ------------------------------------------------------------------------------

class PropertyListCreate(generics.ListCreateAPIView):
    """Api view that handle the creation of a property object"""

    queryset = Property.objects.all()
    serializer_class = PropertySerializer


class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (IsMemberAndAdmin)
