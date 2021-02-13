
from django.db.models.signals import post_save
from django.dispatch import receiver

from frontdesk.notification.models import Notification
from django.contrib.auth.models import User  



@receiver(post_save, sender=User)
def create_notification(sender, instance, created, **kwargs):
    """ When an instance of a user is created, a notification is sent to the user """
    if created:
        
        instance.objects.make_random_password()
        Notification.objects.create(
            receiver=instance,
            # if user has first_name filled out use it else use username
            title=f"Bienvenue {instance.first_name if instance.first_name else instance.username} 👋",
            content="N'hésitez pas à remplir votre profil pour finaliser l'inscription",
        )

