""" Views for the workspace app """

from rest_framework import permissions


class IsPropertyMember(permissions.BasePermission):
    """ If user does not match request object author, return 403 """

    def has_object_permission(self, request, view, obj):

        if request.user in obj.property.collaborator.all():
            return True
        else:
            return False


class IsPropertyMemberNotebook(permissions.BasePermission):
    """ If user does not match request object author, return 403 """

    def has_object_permission(self, request, view, obj):

        if request.user in obj.property.collaborator.all():
            return True
        else:
            return False


class IsAuthor(permissions.BasePermission):
    """ If user does not match request object author, return 403 """

    def has_object_permission(self, request, view, obj):

        if obj.author == request.user:
            return True
        else:
            return False


class IsAuthorOrAdmin(permissions.BasePermission):
    """ If user does not match request object author, return 403 """

    def has_object_permission(self, request, view, obj):

        if obj.author == request.user or obj.property.collaborator.all():
            return True
        else:
            return False
