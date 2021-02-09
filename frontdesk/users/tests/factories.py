from django.contrib.auth.models import User
import factory.fuzzy


class UserFactory(factory.django.DjangoModelFactory):
    """Generate fake data for user object """

    username = factory.fuzzy.FuzzyText()
    password = factory.fuzzy.FuzzyText()

    class Meta:
        model = User
