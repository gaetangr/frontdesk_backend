from rest_framework import permissions

from frontdesk.property.models import PropertyPermission


class IsMember(permissions.BasePermission):
    """ If user is member of the property allow CRUD, else return 403 """

    def has_object_permission(self, request, view, obj):

        if request.user in obj.collaborator.all():
            return True
        else:
            return False

class IsMemberAndAdmin(permissions.BasePermission):
    """ If user is member of the property and admin allow CRUD, else return 403 """

    def has_object_permission(self, request, view, obj):
        user = request.user
        property_permission = PropertyPermission.objects.get(user=user)
        if user in obj.collaborator.all() and property_permission.is_admin == True:
            return True
        else:
            return False

class IsMemberAndStaff(permissions.BasePermission):
    """ If user is member of the property and staff allow CRUD, else return 403 """

    def has_object_permission(self, request, view, obj):
        user = request.user
        property_permission = PropertyPermission.objects.get(user=user)
        if user in obj.collaborator.all() and property_permission.is_staff == True:
            return True
        else:
            return False
