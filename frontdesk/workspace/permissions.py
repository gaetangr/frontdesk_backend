from rest_framework import permissions


class IsAuthor(permissions.BasePermission):
    """ If user does not match request object author, return 403 """

    def has_object_permission(self, request, view, obj):

        if obj.author == request.user:
            return True
        else:
            return False
