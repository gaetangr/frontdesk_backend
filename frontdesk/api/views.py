""" Api views and logic for the front desk application """
from uuid import uuid4

from rest_framework import generics

from django.contrib.auth import get_user_model
from frontdesk.property.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Notebook

from .serializers import NotebookSerializer, PropertySerializer, UserSerializer

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class NotebookListCreate(generics.ListCreateAPIView):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer

class NotebookDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a notebook object"""
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer

class PropertyListCreate(generics.ListCreateAPIView):
    """Api view that hande the creation of a property object"""
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    
    def save(self, *args, **kwargs):
        """ Overide save method to allow the token field to be set with an uuid """
        self.token = uuid4()
        super(self).save(*args, **kwargs)
