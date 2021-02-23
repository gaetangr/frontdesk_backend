""" Permissions for the property app """
from rest_framework import permissions


class IsMember(permissions.BasePermission):
    """ If user is member of the property allow CRUD, else return 403 """

    def has_object_permission(self, request, view, obj):

        return request.user in obj.collaborator.all()
