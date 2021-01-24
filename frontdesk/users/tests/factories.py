import factory.fuzzy
from django.contrib.auth.models import User


class UserFactory(factory.django.DjangoModelFactory):
    """Generate fake data for user object """

    username = factory.fuzzy.FuzzyText()
    password = factory.fuzzy.FuzzyText()

    class Meta:
        model = User
