from django.urls import path

from . import views

urlpatterns = [
    # FRONTDESK GLOBAL ROUTES
    # ------------------------------------------------------------------------------
    path("", view=views.FrontDeskDetail.as_view(), name="frontdesk"),
    # WORKSPACE ROUTES
    # ------------------------------------------------------------------------------
    path("workspace/<int:pk>/", view=views.WorkspaceDetail.as_view(), name="workspace"),
    # USERS ROUTES
    # ------------------------------------------------------------------------------
    path("users/", view=views.UserListCreate.as_view()),
    path("users/<int:pk>/", view=views.UserDetail.as_view(), name="users-detail"),
    # NOTEBOOK ROUTES
    # ------------------------------------------------------------------------------
    path(
        "notebook/create/", view=views.NotebookCreate.as_view(), name="notebook-create"
    ),
    path("notebook/list/", view=views.NotebookList.as_view(), name="notebook-list"),
    path("notebook/<int:pk>/", view=views.NotebookDetail.as_view()),
    # COMMENTS ROUTES
    # ------------------------------------------------------------------------------
    path("comment/", view=views.CommentListCreate.as_view(), name="comment-create"),
    # PROPERTY ROUTES
    # ------------------------------------------------------------------------------
    path("property/", view=views.PropertyListCreate.as_view(), name="property"),
    path(
        "property/<int:pk>/",
        view=views.PropertyDetail.as_view(),
        name="property-detail",
    ),
]
