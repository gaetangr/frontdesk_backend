from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.utils.translation import gettext as _
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework import permissions # new
from drf_yasg.views import get_schema_view # new
from drf_yasg import openapi # new

schema_view = get_schema_view( # new
openapi.Info(
title="Blog API",
default_version="v1",
description="A sample API for learning DRF",
terms_of_service="https://www.google.com/policies/terms/",
contact=openapi.Contact(email="hello@example.com"),
license=openapi.License(name="BSD License"),
),
public=True,
permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Homepage ----------------------------------
    # Template view ----------------------------------
    path("base", TemplateView.as_view(template_name="base.html"), name="base"),
    # Admin routes ----------------------------------
    path("admin/", admin.site.urls, name="admin_panel"),
    path("admin/doc/", include("django.contrib.admindocs.urls")),
    # Local apps ----------------------------------
    path("api/v1/", include("frontdesk.api.urls")),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/dj-rest-auth/', include('dj_rest_auth.urls')),
    path('api/v1/dj-rest-auth/registration/',
    include('dj_rest_auth.registration.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui( 'redoc', cache_timeout=0), name='schema-redoc'),
]


# Define a custome header
admin.site.site_title = _("Front Desk - Web plateform")
# Pour que les liens des images soit fonctionel en developpement
if settings.DEBUG:
    urlpatterns = [] + urlpatterns
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
