"""
Using selenium, i am interacting with the web interface 
to test if messages can be send, user can register and so on.
"""
import sys
import time

from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.core import mail
from django.test import TestCase
from django.urls import reverse
from selenium import webdriver

from config.settings.base import BASE_DIR


chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("window-size=1920x1080")


class TestUserCanLogin(StaticLiveServerTestCase):
    """
    Functional test for the login page front end
    """

    @classmethod
    def setUpClass(cls):
        """
        Setting up tests variables and config
        """
        super().setUpClass()
        cls.browser = webdriver.Chrome(
            executable_path=str(BASE_DIR / "webdrivers" / "chromedriver"),
            options=chrome_options,
        )

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cls.browser.quit()

    def test_if_user_can_login(self):
        """
        User should be able to login to the front
        end interface and access the dashboard or any other place.
        """

        # Accessing front end interface
        self.browser.get("https://beta.front-desk.app/auth/sign-in")

        # Accessing css id and class
        self.browser.find_element_by_css_selector("#username").send_keys("demo")
        self.browser.find_element_by_css_selector("#password").send_keys("frontdesk2020")
        self.browser.find_element_by_css_selector(".MuiButton-label").click()

        # Uncomment to local testing
        # time.sleep(10)
