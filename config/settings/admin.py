"""
Creating a new instance of the admin site to enable property owner to manager
their team and property without causing security issues and conflicts with the base
admin site
"""
from django.contrib import admin
from django.contrib import messages
from django.contrib.admin import AdminSite
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html

from frontdesk.notification.models import Notification
from frontdesk.properties.models import Checklist
from frontdesk.properties.models import Document
from frontdesk.properties.models import Planning
from frontdesk.properties.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Comment
from frontdesk.workspace.models import Notebook


class MyAdminSite(AdminSite):
    site_header = "Espace manager"
    site_title = "Front Desk - Web plateform"
    index_title = "Gestion de votre établissement "
    site_url = "http://localhost:3000/dashboard/default"


admin_manager = MyAdminSite(name="manager-admin")


# Custom field for property model
def nbr_message(obj):
    """ custom function to count members of given property """
    return obj.collaborator.all().count()


nbr_message.short_description = "Nombre de membres"


def nbr_files(obj):
    """ custom function to count members of given property """
    total_file = (
        obj.plannings.all().count()
        + obj.checklists.all().count()
        + obj.documents.all().count()
    )
    return total_file


nbr_files.short_description = "Nombre total de fichiers"


@admin.register(Property, site=admin_manager)
class PropertyAdmin(admin.ModelAdmin):
    """ Custom property admin to display custom fields and methods """

    text_fields = {"collaborator": admin.VERTICAL}
    list_display = ["name", "created", nbr_message, nbr_files]

    fieldsets = (
        (
            None,
            {
                "fields": ("notice",),
            },
        ),
        (
            "Options avancées",
            {
                "classes": ("collapse",),
                "fields": ("name",),
            },
        ),
    )

    def has_module_permission(self, request):
        return True

    def has_view_permission(self, request, obj=None):
        return True

    def has_delete_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_change_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.pk == 33:
            return qs
        return qs.filter(collaborator=request.user)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        user = request.user

        properties = Property.objects.all().filter(collaborator=user.pk).first()
        if db_field.name == "collaborator":
            kwargs["queryset"] = User.objects.all().filter(property=properties)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    readonly_fields = ("is_premium",)


@admin.register(Checklist, Document, Planning, site=admin_manager)
class PropertyFilesAdmin(admin.ModelAdmin):
    """ Custom property admin to display custom fields and methods """

    list_display = ["name", "created"]
    exclude = ("properties",)
    prepopulated_fields = {"name": ("file",)}

    def has_module_permission(self, request):
        return True

    def has_view_permission(self, request, obj=None):
        return True

    def has_delete_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_add_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_change_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def save_model(self, request, obj, form, change):
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        obj.properties = properties
        super().save_model(request, obj, form, change)


@admin.register(User, site=admin_manager)
class UserAdmin(admin.ModelAdmin):
    """ Custom property admin to display custom fields and methods """

    list_display = ["username", "first_name", "is_staff", "date_joined", "last_login"]
    prepopulated_fields = {
        "username": ("first_name", "last_name"),
        "password": ("first_name", "last_name"),
    }
    fieldsets = (
        (
            "Fiche collaborateur",
            {
                "description": format_html(
                    "<h3> Créer un compte facilement</h3> <hr/> <br/> <p> Afin de faciliter la création de compte, le champ <strong> Nom d'utilisateur </strong> et <strong> Mot de passe </strong> sont générés avec le prénom et nom. </p> <p> Vous pouvez choisir de les modifier </p>"
                ),
                "fields": ("first_name", "last_name", "password", "username"),
            },
        ),
        (
            "Options avancées",
            {
                "classes": ("collapse",),
                "description": (
                    "Les options avancées permettent de gérer précisement les droits et actions de vos utilisateurs\n"
                ),
                "fields": ("title", "is_staff", "is_active", "is_admin"),
            },
        ),
    )

    def response_add(self, request, obj, post_url_continue=None):
        user = request.user
        obj.set_password(obj.password)
        obj.save()
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        properties.collaborator.add(obj.id)
        self.message_user(
            request,
            f"{obj.first_name} a été ajouté à votre établissement",
            messages.SUCCESS,
        )
        return super().response_add(
            request,
            obj,
        )

    def get_queryset(self, request):
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        qs = super().get_queryset(request)
        if request.user.pk == 33:
            return qs
        return qs.all().filter(property=properties)

    def has_module_permission(self, request):
        return True

    def has_view_permission(self, request, obj=None):
        return True

    def has_add_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_change_permission(self, request, obj=None):
        if request.user.is_staff:
            return True


@admin.register(Comment, Notebook, site=admin_manager)
class WorkspaceAdmin(admin.ModelAdmin):
    """ Custom property admin to display custom fields and methods """

    exclude = ("workspace", "tag_user", "author")

    def has_module_permission(self, request):
        if request.user.is_staff:
            return True

    def has_view_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_delete_permission(self, request, obj=None):
        if request.user.is_staff:
            return True


@admin.register(Notification, site=admin_manager)
class NotificationAdmin(admin.ModelAdmin):
    """ Custom property admin to display custom fields and methods """

    list_display = ["title", "receiver", "created"]
    fieldsets = (
        (
            "Envoyer une notification",
            {
                "description": format_html(
                    "<br/> Les notifications apparaissent instantanément pour l'utilisateur selectionné <u>uniquement</u>, c'est un excellent moyen de communiquer des informations rapidement <br/><br/>"
                ),
                "fields": ("title", "content", "receiver"),
            },
        ),
    )

    exclude = ("is_system", "is_read", "author", "sender", "category")

    def has_module_permission(self, request):
        if request.user.is_staff:
            return True

    def has_view_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_delete_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_add_permission(self, request, obj=None):
        if request.user.is_staff:
            return True
