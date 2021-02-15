"""
This module is responsible to handle the logic of the `users` app.
Each view is a class based view with custom method that return data with 
specific permissions.

- The endpoint are defined in the `users.urls.py` module

- The serializer are defined in the `users.serializer.py` module

- The signals are defined in the `users.signals.py` module

- The behiavors of the data are defined in the `users.models.py` module
"""

from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from frontdesk.users.models import User

from .permissions import IsRequestUser
from .serializers import UserSerializer


User = get_user_model()


# USER API VIEWS
# ------------------------------------------------------------------------------


class UserListCreate(generics.ListCreateAPIView):
    """
    Api endpoint related to `users.Users`

    get:
    Return a list of `users.Users` instance for the request user.

    create:
    Create a `users.Users` instance.


    """

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


    def create(self, request, *args, **kwargs):
        """
        By extending the create method we can return a token
        and the ID of the user once object is created.
        """
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
    """
    Api endpoint related to `users.Users`

    get:
    Return a `users.Users` for the request user.

    delete:
    Delete a `users.Users` instance.

    patch:
    Update a `users.Users` instance.

    """

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
