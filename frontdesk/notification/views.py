""" Api views and logic for the notification app """
from rest_framework import generics

from frontdesk.notification.models import Notification

from .serializers import NotificationCreateSerializer, NotificationSerializer

# NOTIFICATION API VIEWS
# ------------------------------------------------------------------------------


class NotificationList(generics.ListAPIView):
    """Api view that list notifications for a user"""

    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        This view should return a list of all the notifications
        for the currently authenticated user.
        """
        user = self.request.user
        return Notification.objects.all().filter(receiver=user).order_by("-created")


notification_list_view = NotificationList.as_view()


class NotificationDelete(generics.DestroyAPIView):
    """Api view that list notifications for a user"""

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
    """Api view that allow user to create a notification"""

    serializer_class = NotificationCreateSerializer
    queryset = Notification.objects.all()


notification_create_view = NotificationCreate.as_view()
