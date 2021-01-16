from uuid import uuid4

from rest_framework import generics

from frontdesk.property.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Notebook

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

    def save(self, *args, **kwargs):
        self.token = uuid4()
        super(self).save(*args, **kwargs)


"""
class UserViewSet(viewsets.ModelViewSet):

    API endpoint that allows users to be viewed or edited.


    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    """
