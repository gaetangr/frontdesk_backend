from rest_framework import generics, permissions, viewsets

from frontdesk.property.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Notebook, Workspace

from .serializers import NotebookSerializer, PropertySerializer, UserSerializer


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class NotebookListCreate(generics.ListCreateAPIView):
    queryset = Notebook.objects.filter(workspace=35)
    serializer_class = NotebookSerializer


class PropertyListCreate(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer


"""
class UserViewSet(viewsets.ModelViewSet):

    API endpoint that allows users to be viewed or edited.


    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    """
