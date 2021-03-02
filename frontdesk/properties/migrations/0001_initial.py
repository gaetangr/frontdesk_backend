# Generated by Django 3.1.2 on 2021-03-02 15:53

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(help_text='Le nom de votre établissement', max_length=50, verbose_name="Nom de l'établissement")),
                ('notice', models.TextField(blank=True, help_text="L'information du jour apparaitra sur le tableau de bord de votre équipe", null=True, verbose_name='Information du jour')),
                ('slug', autoslug.fields.AutoSlugField(editable=False, populate_from='name', unique=True, verbose_name="Nom de l'établissement")),
                ('is_premium', models.BooleanField(default=False, help_text='Si coché, vous disposez de fonctionnalités exlusives et de contenu illimité', verbose_name='Offre premium')),
                ('is_sponsors', models.BooleanField(default=False, help_text='Si coché, vous disposez de fonctionnalités exlusives et de contenu illimité', verbose_name='Offre sponsors')),
                ('collaborator', models.ManyToManyField(help_text="Les utilisateurs ajoutés auront accès à l'application web", to=settings.AUTH_USER_MODEL, verbose_name='Collaborateurs')),
            ],
            options={
                'verbose_name': 'Établissement',
                'verbose_name_plural': 'Établissements',
            },
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('file', models.FileField(blank=True, help_text='Un fichier disponible au téléchargement par votre équipe', null=True, upload_to='', verbose_name='Document')),
                ('name', models.CharField(blank=True, help_text='Description de votre fichier, laissez vide si besoin', max_length=300, null=True, verbose_name='Description')),
                ('category', models.CharField(choices=[('document', 'Document'), ('checklist', 'Checklist'), ('planning', 'Planning')], default='document', help_text='Catégories utilisées pour filtrer les documents', max_length=20, verbose_name='Catégorie')),
                ('properties', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='properties.property')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
