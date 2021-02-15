# Generated by Django 3.0.11 on 2021-02-15 13:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('properties', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='collaborator',
            field=models.ManyToManyField(help_text="Les utilisateurs ajoutés auront accès à l'application web", to=settings.AUTH_USER_MODEL, verbose_name='Collaborateurs'),
        ),
        migrations.AddField(
            model_name='document',
            name='properties',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='properties.Property'),
        ),
    ]