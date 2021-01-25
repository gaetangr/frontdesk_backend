""" views for the users app """

from django.contrib.auth import get_user_model
from rest_framework import generics

from frontdesk.users.models import User

from .permissions import IsRequestUser
from .serializers import UserSerializer

# USER API VIEWS
# ------------------------------------------------------------------------------


class UserListCreate(generics.ListCreateAPIView):
    """ Api view that display users and allow to create one """

    queryset = User.objects.all()
    serializer_class = UserSerializer


user_list_create_view = UserListCreate.as_view()


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


user_detail_view = UserDetail.as_view()
