from django.urls import path

from frontdesk.property.views import (property_detail_view,
                                      property_list_create_view)
from frontdesk.users.views import user_detail_view, user_list_create_view
from frontdesk.workspace.views import (comment_detail_view,
                                       notebook_create_view,
                                       notebook_detail_view,
                                       notebook_list_view,
                                       workspace_detail_view)

from . import views

urlpatterns = [
    # FRONTDESK GLOBAL ROUTES
    # ------------------------------------------------------------------------------
    path("", view=views.FrontDeskDetail.as_view(), name="frontdesk"),
    # USERS ROUTES
    # ------------------------------------------------------------------------------
    path("users/", view=user_list_create_view),
    path("users/<int:pk>/", view=user_detail_view, name="users-detail"),
    # WORKSPACE ROUTES
    # ------------------------------------------------------------------------------
    path("workspace/<int:pk>/", view=workspace_detail_view, name="workspace"),
    # NOTEBOOK ROUTES
    # ------------------------------------------------------------------------------
    path("notebook/create/", view=notebook_create_view, name="notebook-create"),
    path("notebook/list/", view=notebook_list_view, name="notebook-list"),
    path("notebook/<int:pk>/", view=notebook_detail_view),
    # COMMENTS ROUTES
    # ------------------------------------------------------------------------------
    path("comment/", view=comment_detail_view, name="comment-create"),
    # PROPERTY ROUTES
    # ------------------------------------------------------------------------------
    path("property/", view=property_list_create_view, name="property"),
    path(
        "property/<int:pk>/",
        view=property_detail_view,
        name="property-detail",
    ),
]
