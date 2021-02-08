# Generated by Django 3.0.11 on 2021-01-27 20:19

from django.db import migrations
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ("workspace", "0004_remove_comment_workspace"),
    ]

    operations = [
        migrations.AddField(
            model_name="notebook",
            name="created",
            field=model_utils.fields.AutoCreatedField(
                default=django.utils.timezone.now,
                editable=False,
                verbose_name="created",
            ),
        ),
        migrations.AddField(
            model_name="notebook",
            name="modified",
            field=model_utils.fields.AutoLastModifiedField(
                default=django.utils.timezone.now,
                editable=False,
                verbose_name="modified",
            ),
        ),
    ]
