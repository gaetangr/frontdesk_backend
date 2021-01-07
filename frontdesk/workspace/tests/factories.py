import factory
import factory.fuzzy

from frontdesk.workspace.models import Workspace


class WorkspaceFactory(factory.django.DjangoModelFactory):
    """Factories to be used in unit testing with fakes data """

    name = factory.fuzzy.FuzzyText()
    token = factory.fuzzy.FuzzyText(length=120)
    link_log = factory.fuzzy.FuzzyText(length=120)

    class Meta:
        model = Workspace
