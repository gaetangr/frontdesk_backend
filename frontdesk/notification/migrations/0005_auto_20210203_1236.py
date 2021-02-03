# Generated by Django 3.0.11 on 2021-02-03 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0004_auto_20210203_1212'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='category',
            field=models.CharField(choices=[('notification', 'Notification'), ('tag', 'Tag'), ('message', 'message'), ('pinned', 'Pinned'), ('system', 'System')], default='notification', max_length=20, verbose_name='Category'),
        ),
    ]
