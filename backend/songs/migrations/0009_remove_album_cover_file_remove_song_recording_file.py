# Generated by Django 4.2.1 on 2023-05-17 17:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0008_alter_album_cover_link_alter_song_recording_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='album',
            name='cover_file',
        ),
        migrations.RemoveField(
            model_name='song',
            name='recording_file',
        ),
    ]
