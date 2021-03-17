""" 
By extendings the manage commands from the Django Framework
We can create a super account with one one command by running
`python manage.py super_account`
"""
import time
import webbrowser

import crayons
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from halo import Halo

from frontdesk.users.models import User


class Command(BaseCommand):
    """Creating a superuser for the admin panel with prepopulated datas"""

    help = "Creating a superuser for the admin panel with prepopulated datas"

    def handle(self, *args, **options):
        spinner = Halo(text="Creating super user..", text_color="yellow", spinner="dots")
        spinner.start()
        time.sleep(3)
        admin_url = "http://127.0.0.1:8000/admin/"
        default_password = "password"
        default_username = "admin"
        try:
            User.objects.create_user(
                username=default_username,
                password=default_password,
                first_name="Gaëtan",
                last_name="GR",
                is_superuser=True,
                is_staff=True,
                email="hello@gaetangr.me",
            )
            spinner.succeed(crayons.green("Success!"))
            print(
                crayons.normal(
                    f"ℹ Username: {crayons.yellow(default_username)} - Password: {crayons.yellow(default_password)} - Connect to: {crayons.yellow(admin_url)} \n"
                )
            )

            input(
                crayons.yellow(
                    "Would You like to be redirect to the admin panel ? [y]/[n]"
                )
            )
            webbrowser.open(admin_url)
        except IntegrityError:
            spinner.fail(
                crayons.red(
                    "The superuser has already been created! use command: 'python manage.py createsuperuser'"
                )
            )
