"""
This module takes all of the path from each app and return an 
endpoint.
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include
from django.urls import path
from django.utils.html import format_html
from django.utils.translation import gettext as _
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from config.settings.admin import admin
from config.settings.admin import admin_manager


schema_view = get_schema_view(
    openapi.Info(
        title="Front desk API",
        default_version="v1",
        description="Endpoint for the front desk API",
        contact=openapi.Contact(name="Gaëtan", email="hello@gaetangr.me"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Admin routes
    # ----------------------------------
    path(
        "admin/password_reset/",
        auth_views.PasswordResetView.as_view(),
        name="admin_password_reset",
    ),
    path(
        "admin/password_reset/done/",
        auth_views.PasswordResetDoneView.as_view(),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "reset/done/",
        auth_views.PasswordResetCompleteView.as_view(),
        name="password_reset_complete",
    ),
    path("admin-manager/", admin_manager.urls),
    path("admin/", admin.site.urls, name="admin_panel"),
    # path("admin/doc/", include("django.contrib.admindocs.urls")),
    # Local apps
    # ----------------------------------
    path(
        "api/v1/", include("frontdesk.api.urls")
    ),  # ^^^^^^ We are using the path "api/v1"to specify that those endpoints are
    # related to first version of the API.
    # Third party apps
    # ----------------------------
    path("api-auth/", include("rest_framework.urls")),
    path("api/v1/", include("dj_rest_auth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    # Misc
    # ---------------------------------------
    path(
        "api/v1/endpoint/",
        schema_view.with_ui("swagger", cache_timeout=0),  # new
        name="schema-swagger-ui",
    ),
    path(
        "redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),  # new
        name="schema-redoc",
    ),
]

# Custom header and information to keep us updated on the plateform
admin.site.site_title = _("Front Desk - Web plateform")
admin.site.site_header = "Front Desk - Web Plateform"
admin.site.index_title = format_html(
    "Administration Front Desk | <a href='https://trello.com/b/C4oeeKc3/front-desk-road-map'> Trello </a> - <a href='https://github.com/gaetangr/frontdesk_V2'> Github </a> "
)
