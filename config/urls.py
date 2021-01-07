from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.utils.translation import gettext as _
from django.views.generic import TemplateView

urlpatterns = [
    # Homepage ----------------------------------
    # Admin routes ----------------------------------
    path("admin/", admin.site.urls, name="admin_panel"),
    path("admin/doc/", include("django.contrib.admindocs.urls")),
    # Local apps ----------------------------------
    path("api/v1/", include("frontdesk.api.urls")),
    # Template view ----------------------------------
    path("base", TemplateView.as_view(template_name="base.html"), name="base"),
]


# Define a custome header
admin.site.site_title = _("Front Desk - Web plateform")
# Pour que les liens des images soit fonctionel en developpement
if settings.DEBUG:
    urlpatterns = [] + urlpatterns
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
