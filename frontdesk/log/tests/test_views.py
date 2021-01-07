""" Unit tests related to views """

import pytest
from django.urls import reverse

# Data to mock login user for test
username = "Gaëtan"
password = "you-will-never-guess"


@pytest.mark.django_db
def test_if_create_views_is_successful(client, django_user_model):
    """Test if the Create views return a 200 response """
    user = django_user_model.objects.create_user(username=username, password=password)
    client.force_login(user)
    url = reverse("logcreate")
    response = client.get(url)
    assert response.status_code == 200
