from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.utils.translation import gettext as _
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework import permissions  
from drf_yasg.views import get_schema_view  
from drf_yasg import openapi  # 

# Schema view for the api documentation 
schema_view = get_schema_view(  
    openapi.Info(
        title="Front Desk - API",
        default_version="v2.0.0",
        description="API Documentation - Front Desk",
        contact=openapi.Contact(
            name="API developer",
            email="hello@gaetangr.me",
        ),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    # Admin routes ----------------------------------
    path("admin/", admin.site.urls, name="admin_panel"),
    path("admin/doc/", include("django.contrib.admindocs.urls")),
    # Local apps ----------------------------------
    path("api/v1/", include("frontdesk.api.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("api/v1/dj-rest-auth/", include("dj_rest_auth.urls")),
    path(
        "api/v1/dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")
    ),
    # Misc ----------------------------------
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]



admin.site.site_title = _("Front Desk - Web plateform")

if settings.DEBUG:
    urlpatterns = [] + urlpatterns
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
