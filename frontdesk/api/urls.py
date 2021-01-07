from django.urls import path

from . import views

urlpatterns = [
    path("users/", view=views.UserListCreate.as_view()),
    path("notebook/", view=views.NotebookListCreate.as_view()),
    path("property/", view=views.PropertyListCreate.as_view()),
]
