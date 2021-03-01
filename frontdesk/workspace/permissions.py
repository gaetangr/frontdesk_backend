""" Views for the workspace app """

from rest_framework import permissions


class IsPropertyMember(permissions.BasePermission):
    """ If user does not match request object author, return 403 """

    def has_object_permission(self, request, view, obj):

        return request.user in obj.property.collaborator.all()


class IsAuthor(permissions.BasePermission):
    """ If user does not match request object author, return 403 """

    def has_object_permission(self, request, view, obj):

        return obj.author == request.user
