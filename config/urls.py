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

from frontdesk.property.models import Property

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
    
    path("admin/", admin.site.urls, name="admin_panel"),
    path("admin/doc/", include("django.contrib.admindocs.urls")),
    # Local apps
    # ----------------------------------
    path(
        "api/v1/", include("frontdesk.api.urls")
    ),  # <------- We are using the path "api/v1"to specify that those endpoints are
    # related to first version of the API.
    # Third party apps
    # ----------------------------
    path("api-auth/", include("rest_framework.urls")),
    path("api/v1/dj-rest-auth/", include("dj_rest_auth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    # Misc
    # ---------------------------------------
    path(
        "endpoint/",
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
