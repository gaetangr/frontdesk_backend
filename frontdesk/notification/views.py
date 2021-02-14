"""
This module is responsible to handle the logic of the `notification` app.
Each view is a class based view with custom method that return data with 
specific permissions.

- The endpoint are defined in the `notification.urls.py` module

- The behiavors of the data are defined in the `notification.models.py` module

- The signals are defined in the `notification.signals.py` module

- The serializers are defined in the `notification.serializers.py` module 
"""
from rest_framework import generics

from frontdesk.notification.models import Notification

from .serializers import NotificationCreateSerializer
from .serializers import NotificationSerializer


# NOTIFICATION API VIEWS
# ------------------------------------------------------------------------------


class NotificationList(generics.ListAPIView):
    """
    Api endpoint related to `notification.Notification`

    get:
    Return a `notification.Notification` for the request user.

    """

    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        This view should return a list of all the notifications
        for the currently authenticated user.
        """
        user = self.request.user
        return (
            Notification.objects.all()
            .filter(receiver=user)
            .order_by("-created")
            .exclude(category="message")
        )


notification_list_view = NotificationList.as_view()


class PrivateNotificationList(generics.ListAPIView):
    """
    Api endpoint related to `notification.Notification`

    get:
    Return a `notification.Notification` for the request user.

    """

    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        This view should return a list of all the notifications
        for the currently authenticated user.
        """
        user = self.request.user
        return (
            Notification.objects.all()
            .filter(receiver=user, category="message")
            .order_by("-created")
        )


private_notification_list_view = PrivateNotificationList.as_view()


class NotificationDelete(generics.DestroyAPIView):
    """
    Api endpoint related to `notfication.Notification`

    delete:
    Delete a `notfication.Notification` instance.


    """

    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        This view should return a list of all the notifications
        for the currently authenticated user.
        """
        user = self.request.user
        return Notification.objects.all().filter(receiver=user).order_by("-created")


notification_delete_view = NotificationDelete.as_view()


class NotificationCreate(generics.CreateAPIView):
    """
    Api endpoint related to `notfication.Notification`

    create:
    Create a `notfication.Notification` instance.


    """

    serializer_class = NotificationCreateSerializer
    queryset = Notification.objects.all()


notification_create_view = NotificationCreate.as_view()
