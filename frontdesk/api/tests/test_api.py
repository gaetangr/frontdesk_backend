from django.urls import reverse
import pytest


@pytest.fixture
def api_client():
    """Fixture to to create mock Request objects for use in testing"""
    from rest_framework.test import APIClient

    return APIClient()


@pytest.mark.django_db
def test_global_endpoint_is_accessible(api_client):
    """ If user is not authenticated, a list of given endpoint should not be accessible """
    url = reverse("frontdesk")
    response = api_client.get(url)
    assert response.status_code == 200
    assert len(response.content) != 0
