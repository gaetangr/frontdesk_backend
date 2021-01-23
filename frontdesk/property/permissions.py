from rest_framework import permissions

from frontdesk.users.models import Profile


class IsMember(permissions.BasePermission):
    """ If user is member of the property allow CRUD, else return 403 """

    def has_object_permission(self, request, view, obj):

        if request.user in obj.collaborator.all():
            return True
        else:
            return False


class IsMemberAndStaff(permissions.BasePermission):
    """ If user is member of the property and staff allow CRUD, else return 403 """

    def has_object_permission(self, request, view, obj):
        user = request.user
        profile = Profile.objects.get(user=user)

        if user in obj.collaborator.all():
            return True
        else:
            return False
