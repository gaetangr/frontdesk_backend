# Generated by Django 3.0.11 on 2021-02-10 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workspace', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notebook',
            name='category',
            field=models.CharField(choices=[('Tous', 'tous'), ('Maintenance', 'maintenance'), ('Étage', 'etage'), ('staff', 'Staff'), ('manager', 'Manager')], default='Tous', help_text='Use to display certains notes for a specific group of users, by default messages are shown to everyone', max_length=20, verbose_name='Category'),
        ),
    ]
