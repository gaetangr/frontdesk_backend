"""
This module is responsible to handle the logic of the `properties` app.
Each view is a class based view with custom method that return data with 
specific permissions.

- The endpoint are defined in the `properties.urls.py` module

- The serializer are defined in the `properties.serializer.py` module

- The signals are defined in the `properties.signals.py` module 

- The behiavors of the data are defined in the `properties.models.py` module
"""
from rest_framework import generics

from frontdesk.properties.models import Document
from frontdesk.properties.models import Property

from .permissions import IsMember
from .serializers import DocumentSerializer
from .serializers import PropertySerializer


# PROPERTY API VIEWS
# ------------------------------------------------------------------------------


class PropertyListCreate(generics.ListCreateAPIView):
    """
    Api endpoint related to `property.Property`

    get:
    Return a list of `property.Property` for the request user.

    create:
    Create a `property.Property` instance.

    """

    serializer_class = PropertySerializer

    def get_queryset(self):
        """
        This view should return a list of all the properties
        for the currently authenticated user.
        """
        user = self.request.user
        return Property.objects.filter(collaborator=user)


property_list_create_view = PropertyListCreate.as_view()


class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Api endpoint related to `property.Property`

    get:
    Return a `property.Property` for the request user.

    delete:
    Delete a `property.Property` instance.

    patch:
    Update a `property.Property` instance.

    """

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (IsMember,)


property_detail_view = PropertyDetail.as_view()


class DocumentList(generics.ListAPIView):
    """
    Api endpoint related to `property.Property`

    get:
    Return a list of `property.Property` instance.

    """

    serializer_class = DocumentSerializer

    def get_queryset(self):
        """
        This view should return a list of all the properties
        for the currently authenticated user.
        """
        user = self.request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()

        return Document.objects.filter(properties=properties)


document_list_view = DocumentList.as_view()
