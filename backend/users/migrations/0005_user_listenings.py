# Generated by Django 4.2.1 on 2023-05-21 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_user_banner_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='listenings',
            field=models.IntegerField(default=0),
        ),
    ]
