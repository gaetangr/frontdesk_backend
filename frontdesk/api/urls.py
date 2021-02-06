""" Handle all the endpoints for the API, all path are imported here  """
from django.urls import path

from frontdesk.property.views import (property_detail_view,
                                      property_list_create_view,
                                      property_permission_detail_view,
                                      property_permission_list_create_view)
from frontdesk.users.views import (collaborator_retrieve_update_destroy,
                                   user_detail_view, user_list_create_view)
from frontdesk.workspace.views import (comment_detail_view,
                                       notebook_create_view,
                                       notebook_detail_view,
                                       notebook_list_view,
                                       notebook_list_view_pinned,
                                       workspace_detail_view,
                                       workspace_list_create_view)
from frontdesk.notification.views import notification_list_view, notification_create_view
from . import views

urlpatterns = [
    # FRONTDESK GLOBAL ROUTES
    # ------------------------------------------------------------------------------
    path("", view=views.FrontDeskDetail.as_view(), name="frontdesk"),
    # USERS ROUTES
    # ------------------------------------------------------------------------------
    path("users/", view=user_list_create_view),
    path("users/<int:pk>/", view=user_detail_view, name="users-detail"),
    path(
        "collaborator/",
        view=collaborator_retrieve_update_destroy,
        name="collaborator-manage",
    ),
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
    path("notebook/list/pinned", view=notebook_list_view_pinned, name="notebook-list-pinned"),
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
        "property-permission/",
        view=property_permission_list_create_view,
        name="property-permission-list-create",
    ),
    path(
        "property-permission/<int:pk>/",
        view=property_permission_detail_view,
        name="property-permission-detail",
    ),
    # NOTIFICATION ROUTES
    # ------------------------------------------------------------------------------
    path("notification/", view=notification_list_view, name="notification-list"),
    path("notification/create", view=notification_create_view, name="notification-create"),

]
