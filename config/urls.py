from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.models import User
from django.urls import include, path
from django.utils.html import format_html
from django.utils.translation import gettext as _
from django.views.generic import TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.schemas import get_schema_view

from frontdesk.property.models import Property

urlpatterns = [
    # Admin routes
    # ----------------------------------
    path("admin/", admin.site.urls, name="admin_panel"),
    path("admin/doc/", include("django.contrib.admindocs.urls")),
    # Local apps
    # ----------------------------------
    path("api/v1/", include("frontdesk.api.urls")),
    # Third party apps
    # ----------------------------
    path("api-auth/", include("rest_framework.urls")),
    path("api/v1/dj-rest-auth/", include("dj_rest_auth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    # Misc
    # ---------------------------------------
]

# Custom header and information to keep us updated on the plateform
admin.site.site_title = _("Front Desk - Web plateform")
admin.site.site_header = "Front Desk - Web Plateform"
admin.site.index_title = format_html("Administration Front Desk | <a href='https://trello.com/b/C4oeeKc3/front-desk-road-map'> Trello </a> - <a href='https://github.com/gaetangr/frontdesk_V2'> Github </a> ")