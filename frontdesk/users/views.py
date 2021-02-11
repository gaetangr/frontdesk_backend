""" views for the users app """

from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from frontdesk.properties.models import Property
from frontdesk.users.models import User

from .permissions import IsRequestUser
from .serializers import CollaboratorSerializer
from .serializers import ProfileSerializer
from .serializers import UserSerializer


User = get_user_model()


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

    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        This view should return the user detail only
        for the currently authenticated user.
        """
        user = self.request.user
        return get_user_model().objects.filter(pk=user.pk)

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response(
            {"token": token.key, "user": serializer.instance.id},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


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
        return User.objects.filter(pk=user.pk)


profile_detail_view = ProfileDetail.as_view()
