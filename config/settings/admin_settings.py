"""
Setting up custom information to match Front Desk 
frontend information, those informations are only available for
superuser. 
"""
from django.contrib import admin
from django.utils.html import format_html


ADMIN_TITLE = admin.site.site_title = "Front Desk - Web plateform"
ADMIN_HEADER = admin.site.site_header = "Front Desk - Web Plateform"
ADMIN_INDEX = admin.site.index_title = format_html(
    "Administration Front Desk | <a href='https://trello.com/b/C4oeeKc3/front-desk-road-map'> Trello </a> - <a href='https://github.com/gaetangr/frontdesk_V2'> Github </a> "
)
