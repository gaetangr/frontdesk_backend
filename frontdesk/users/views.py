""" views for the users app """

from django.contrib.auth import get_user_model
from rest_framework import generics

from frontdesk.property.models import Property
from frontdesk.users.models import User, Profile

from .permissions import IsRequestUser
from .serializers import CollaboratorSerializer, UserSerializer, ProfileSerializer

# USER API VIEWS
# ------------------------------------------------------------------------------


class CollaboratorRetrieveUpdateDestroy(generics.ListAPIView):
    """ Api view that allow user to retrieve, update, or destroy an instance of a collaborator"""

    serializer_class = CollaboratorSerializer

    def get_queryset(self):
        """
        This view should return the user detail only
        for the currently authenticated user.
        """

        user = self.request.user
        property = Property.objects.filter(collaborator=user).first().pk

        return User.objects.filter(property=property)


collaborator_retrieve_update_destroy = CollaboratorRetrieveUpdateDestroy.as_view()


class UserListCreate(generics.ListCreateAPIView):
    """ Api view that display users and allow to create one """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        This view should return the user detail only
        for the currently authenticated user.
        """
        user = self.request.user
        return get_user_model().objects.filter(pk=user.pk)


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


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    """Api View that allow user to update, delete or retrieve a user object"""

    serializer_class = ProfileSerializer
   

    def get_queryset(self):
        """
        This view should return the user detail only
        for the currently authenticated user.
        """
        user = self.request.user
        return Profile.objects.filter(user=user)


profile_detail_view = ProfileDetail.as_view()