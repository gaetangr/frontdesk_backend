""" Api views and logic for the front desk application """
from uuid import uuid4

from django.contrib.auth import get_user_model
from rest_framework import generics, serializers, status
from rest_framework.exceptions import APIException, PermissionDenied
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from frontdesk.property.models import Property
from frontdesk.property.permissions import IsMember
from frontdesk.users.models import User
from frontdesk.users.permissions import IsRequestUser
from frontdesk.workspace.models import Notebook
from frontdesk.workspace.permissions import IsAuthor

from .serializers import NotebookSerializer, PropertySerializer, UserSerializer


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsRequestUser,)


class NotebookListCreate(generics.CreateAPIView):
    queryset = Notebook.objects.filter(workspace=1)
    serializer_class = NotebookSerializer


class NotebookDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a notebook object"""

    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (IsAuthor,)


class PropertyListCreate(generics.ListCreateAPIView):
    """Api view that handle the creation of a property object"""

    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def save(self, *args, **kwargs):
        """ Overide save method to allow the token field to be set with an uuid """
        self.token = uuid4()
        super(self).save(*args, **kwargs)


class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (IsMember,)
