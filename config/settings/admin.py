"""
Creating a new instance of the admin site to enable property owner to manager
their team and property without causing security issues and conflicts with the base
admin site.

Creating a new ModelAdmin : To create a new `ModelAdmin` class it is important 
to register it with the correct site ex: `@admin.register(Model, site=admin_manager)` 
else it will not be shown for property owner.

Each classes override a set of methods and attributes, they are fully documented 
in top of each class.
"""
import logging

from django.contrib import admin
from django.contrib import messages
from django.contrib.admin import AdminSite
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html

from frontdesk.checklist.models import Task
from frontdesk.notification.models import Notification
from frontdesk.properties.models import Document
from frontdesk.properties.models import Property
from frontdesk.users.models import User
from frontdesk.workspace.models import Notebook


class MyAdminSite(AdminSite):
    """
    This AdminSite object encapsulates an instance of the Django admin application
    to be used by users with limited access and permissions
    """

    site_header = "Espace manager"
    site_title = "Front Desk - Plateforme web"
    index_title = "Gestion de votre établissement - Bêta"
    site_url = "https://beta.front-desk.app/dashboard/default"


admin_manager = MyAdminSite(name="manager-admin")


# Custom field for property model
def nbr_message(obj):
    """
    custom function to count members of given property
    """
    return obj.collaborator.all().count()


nbr_message.short_description = "Nombre de membres"


def nbr_files(obj):
    """
    custom function to count members of given property
    """
    return obj.documents.all().count()


nbr_files.short_description = "Nombre total de fichiers"


@admin.register(Property, site=admin_manager)
class PropertyAdmin(admin.ModelAdmin):
    """
    `PropertyAdmin` extends the ModelAdmin class.

    This class allow us to custom the admin interface
    and how the data are being display, modified and created.

    - list_display: What fields are display on the object page.

    - fieldsets: For more complex layout needs, allows
    css classes, description from each field etc...

    - has_object_permission: Similar to the permissions set
    in `app.permissions.py`, it should return true if viewing,
    deleting, modifying or creating is authorized.

    """

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

    # The description of each permissions are described below
    # They are similar to each other in each classes

    def has_module_permission(self, request):
        """
        Authorized users should access the :model:`properties.Property`
        instance in the administration panel

        Note that `has_module_permission` requires `has_view_permission`
        to activate the view module in the admin panel, else will not show
        """
        return True

    def has_view_permission(self, request, obj=None):
        """
        Authorized users should access the :model:`properties.Property`
        instance in the administration panel

        Note that `has_view_permission` requires `has_module_permission`
        to activate the view module in the admin panel, else will not show
        """
        return True

    def has_delete_permission(self, request, obj=None):
        """
        Authorized users should be able to create
        new instance of :model:`properties.Property`
        instance in the administration panel
        """
        if request.user.is_staff:
            return True

    def has_change_permission(self, request, obj=None):
        """
        Authorized users should be able to update
        new instance of :model:`properties.Property`
        instance in the administration panel
        """
        if request.user.is_staff:
            return True

    def get_queryset(self, request):
        """
        Queryset that return specific set of data
        if the user is collaborator of the
        :model:`properties.Property`
        instance
        """
        qs = super().get_queryset(request)
        if request.user.pk == 33:
            return qs
        return qs.filter(collaborator=request.user)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        """
        By extendings the formfield for ManyToMany field, only the
        users from within a given property can be selected or removed
        """
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        if db_field.name == "collaborator":
            kwargs["queryset"] = User.objects.all().filter(property=properties)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    readonly_fields = ("is_premium",)


@admin.register(Document, site=admin_manager)
class DocumentFilesAdmin(admin.ModelAdmin):
    """
    `DocumentAdmin` extends the ModelAdmin class.

    This class allow us to custom the admin interface
    and how the data are being display, modified and created.

    - list_display: What fields are display on the object page.

    - exclude: If given, should be a list of field
    names to exclude from the form.

    - prepopulated_fields: When set, the given fields will use a bit of
    JavaScript to populate from the fields assigned

    - has_object_permission: Similar to the permissions set
    in `app.permissions.py`, it should return true if viewing,
    deleting, modifying or creating is authorized.

    """

    list_display = ["name", "created", "category"]
    exclude = ("properties",)
    # The name will be prepopulated by the file name
    prepopulated_fields = {"name": ("file",)}

    # See comment from property class to understand
    # what those permissions are all about
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

    def get_queryset(self, request):
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        qs = super().get_queryset(request)
        if request.user.pk == 33:
            return qs
        return qs.all().filter(properties=properties)

    def response_add(self, request, obj, post_url_continue=None):
        """
        Reponse add is similar to signals in the sense that
        it is called after the admin form is submitted and just
        after the object and all the related instances have
        been created and saved

        By overriding this method I can set the current user to
        the selected property and hash the password with the
        `set_password` method.
        """
        if Document.objects.all().count() > 1:
            self.message_user(
                request,
                "Vous avez atteint la limite de fichiers, vous pouvez supprimer des fichiers ou passez à la version premium.",
                messages.ERROR,
            )
            obj.delete()

        return super().response_add(
            request,
            obj,
        )


@admin.register(User, site=admin_manager)
class UserAdmin(admin.ModelAdmin):
    """
    `UserAdmin` extends the ModelAdmin class.

    This class allow us to custom the admin interface
    and how the data are being display, modified and created.

    - list_display: What fields are display on the object page.

    - prepopulated_fields: When set, the given fields will use a bit of
    JavaScript to populate from the fields assigned

    - has_object_permission: Similar to the permissions set
    in `app.permissions.py`, it should return true if viewing,
    deleting, modifying or creating is authorized.

    - fieldsets: For more complex layout needs, allows
    css classes, description from each field etc...
    """

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
                "fields": ("title", "first_name", "last_name", "password", "username"),
            },
        ),
        (
            "Options avancées",
            {
                "classes": ("collapse",),
                "description": (
                    "Les options avancées permettent de gérer précisement les droits et actions de vos utilisateurs\n"
                ),
                "fields": ("is_staff", "is_active", "is_admin"),
            },
        ),
    )

    def response_add(self, request, obj, post_url_continue=None):
        """
        Reponse add is similar to signals in the sense that
        it is called after the admin form is submitted and just
        after the object and all the related instances have
        been created and saved

        By overriding this method I can set the current user to
        the selected property and hash the password with the
        `set_password` method.
        """
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        properties.collaborator.add(obj.id)
        self.message_user(
            request,
            f"{obj.first_name} a été ajouté à votre établissement",
            messages.SUCCESS,
        )
        # When a new instance of :model:`users.Users` is created from
        # The administration we want to
        # be notified so we can track the data from our logging SDK
        logging.info(f"{obj} has joined Front Desk [from admin panel]! ✨")
        return super().response_add(
            request,
            obj,
        )

    def get_queryset(self, request):
        """
        Queryset that return specific set of data
        if the user is collaborator of the
        :model:`properties.Property`
        instance
        """
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


@admin.register(Notebook, site=admin_manager)
class WorkspaceAdmin(admin.ModelAdmin):
    """
    `WorkspaceAdmin` extends the ModelAdmin class.

    This class allow us to custom the admin interface
    and how the data are being display, modified and created.

    - exclude: If given, should be a list of field
    names to exclude from the form.
    """

    exclude = ("workspace", "tag_user", "author")

    # See comment from property class to understand
    # what those permissions are all about
    def has_module_permission(self, request):
        if request.user.is_staff:
            return True

    def has_view_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_delete_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def get_queryset(self, request):
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        workspace = properties.workspace
        qs = super().get_queryset(request)
        return qs.all().filter(workspace=workspace)


@admin.register(Notification, site=admin_manager)
class NotificationAdmin(admin.ModelAdmin):
    """
    `NotificationAdmin` extends the ModelAdmin class.

    This class allow us to custom the admin interface
    and how the data are being display, modified and created.

    - list_display: What fields are display on the object page.

    - has_object_permission: Similar to the permissions set
    in `app.permissions.py`, it should return true if viewing,
    deleting, modifying or creating is authorized.

    - fieldsets: For more complex layout needs, allows
    css classes, description from each field etc...

    - exclude: If given, should be a list of field
    names to exclude from the form
    """

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

    # See comment from property class to understand
    # what those permissions are all about
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

    def get_queryset(self, request):
        user = request.user
        qs = super().get_queryset(request)
        return qs.all().filter(receiver=user)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """
        By extendings the formfield for ManyToMany field, only the
        users from within a given property can be selected
        """
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        if db_field.name == "receiver":
            kwargs["queryset"] = User.objects.all().filter(property=properties)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(Task, site=admin_manager)
class TaskAdmin(admin.ModelAdmin):
    """
    `TaskAdmin` extends the ModelAdmin class.

    This class allow us to custom the admin interface
    and how the data are being display, modified and created.

    - exclude: If given, should be a list of field
    names to exclude from the form.
    """

    list_display = ["content", "category", "created"]
    exclude = ("is_done",)

    # See comment from property class to understand
    # what those permissions are all about
    def has_module_permission(self, request):
        if request.user.is_staff:
            return True

    def has_add_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_view_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def has_delete_permission(self, request, obj=None):
        if request.user.is_staff:
            return True

    def get_queryset(self, request):
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        workspace = properties.workspace
        qs = super().get_queryset(request)
        return qs.all().filter(property=properties)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        """
        By extendings the formfield for ManyToMany field, only the
        users from within a given property can be selected or removed
        """
        user = request.user
        properties = Property.objects.all().filter(collaborator=user.pk).first()
        if db_field.name == "property":
            kwargs["queryset"] = Property.objects.filter(pk=properties.pk).all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
