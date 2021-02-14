""" 
Front Desk defines a bunch of endpoint to communicate data to the Front end.
Each endpoint is the location from which APIs can access the resources 
they need to carry out their function.

Each endpoint in this module are split into categories from the 
app they are related.
"""
from django.urls import path

from frontdesk.notification.views import notification_create_view
from frontdesk.notification.views import notification_delete_view
from frontdesk.notification.views import notification_list_view
from frontdesk.notification.views import private_notification_list_view
from frontdesk.properties.views import document_list_view
from frontdesk.properties.views import property_detail_view
from frontdesk.properties.views import property_list_create_view
from frontdesk.users.views import profile_detail_view
from frontdesk.users.views import user_detail_view
from frontdesk.users.views import user_list_create_view
from frontdesk.workspace.views import comment_detail_view
from frontdesk.workspace.views import notebook_create_view
from frontdesk.workspace.views import notebook_detail_view
from frontdesk.workspace.views import notebook_list_view
from frontdesk.workspace.views import notebook_list_view_pinned
from frontdesk.workspace.views import workspace_detail_view
from frontdesk.workspace.views import workspace_list_create_view


urlpatterns = [
    # FRONTDESK GLOBAL ROUTES
    # ------------------------------------------------------------------------------
    # USERS ROUTES
    # ------------------------------------------------------------------------------
    path("users/", view=user_list_create_view),
    path("users/<int:pk>/", view=user_detail_view, name="users-detail"),
    # WORKSPACE ROUTES
    # ------------------------------------------------------------------------------
    path("workspace/<int:pk>/", view=workspace_detail_view, name="workspace-detail"),
    path(
        "workspace/create",
        view=workspace_list_create_view,
        name="workspace-list-create",
    ),
    # NOTEBOOK ROUTES
    # ------------------------------------------------------------------------------
    path("notebook/create/", view=notebook_create_view, name="notebook-create"),
    path("notebook/list/", view=notebook_list_view, name="notebook-list"),
    path(
        "notebook/list/pinned",
        view=notebook_list_view_pinned,
        name="notebook-list-pinned",
    ),
    path("notebook/<int:pk>/", view=notebook_detail_view, name="notebook-detail"),
    # COMMENTS ROUTES
    # ------------------------------------------------------------------------------
    path("comment/", view=comment_detail_view, name="comment-create"),
    # PROPERTY ROUTES
    # ------------------------------------------------------------------------------
    path("property/", view=property_list_create_view, name="property-list-create"),
    path(
        "property/<int:pk>/",
        view=property_detail_view,
        name="property-detail",
    ),
    path(
        "documents/",
        view=document_list_view,
        name="document-list",
    ),
    # NOTIFICATION ROUTES
    # ------------------------------------------------------------------------------
    path("notification/", view=notification_list_view, name="notification-list"),
    path(
        "notification/private", view=private_notification_list_view, name="private-list"
    ),
    path(
        "notification/delete/<int:pk>/",
        view=notification_delete_view,
        name="notification-delete",
    ),
    path(
        "notification/create", view=notification_create_view, name="notification-create"
    ),
]
