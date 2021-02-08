""" Api views and logic for the global views """

from rest_framework import generics
from rest_framework.permissions import AllowAny

from frontdesk.users.models import User

from .serializers import FrontDeskSerializer


# GENERAL API VIEWS
# ------------------------------------------------------------------------------


class FrontDeskDetail(generics.ListAPIView):
    """Api View that return stats related to Front Desk"""

    serializer_class = FrontDeskSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
