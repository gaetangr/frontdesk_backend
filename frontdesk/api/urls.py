from django.urls import path

from . import views

urlpatterns = [
    # USERS ROUTES
    path("users/", view=views.UserListCreate.as_view()),
    path("users/<int:pk>/", view=views.UserDetail.as_view()),
    # NOTEBOOK ROUTES
    path("notebook/", view=views.NotebookListCreate.as_view()),
    path("notebook/<int:pk>/", view=views.NotebookDetail.as_view()),
    # PROPERTY ROUTES
    path("property/", view=views.PropertyListCreate.as_view()),
]
