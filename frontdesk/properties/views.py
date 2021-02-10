""" Api views and logic for the property app """
from rest_framework import generics

from frontdesk.properties.models import Property

from .permissions import IsMember
from .serializers import PropertySerializer


# PROPERTY API VIEWS
# ------------------------------------------------------------------------------


class PropertyListCreate(generics.ListCreateAPIView):
    """Api view that handle the creation and list of a property object"""

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
    """Api View that allow user to update, delete or retrieve a user object"""

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (IsMember,)


property_detail_view = PropertyDetail.as_view()


# PROPERTY PERMISSION API VIEWS
# ------------------------------------------------------------------------------
