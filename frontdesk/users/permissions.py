""" Permissions for the users app """

from rest_framework import permissions


class IsRequestUser(permissions.BasePermission):
    """ If user does not match request object, return 403 """

    def has_object_permission(self, request, view, obj):

        if obj == request.user:

            return True
        else:
            return False
