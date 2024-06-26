# Generated by Django 4.2.1 on 2023-06-11 12:27

from django.db import migrations, models
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0020_alter_album_cover_link_alter_album_tags_and_more'),
        ('taggit', '0005_auto_20220424_2025'),
        ('users', '0007_user_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorite_albums',
            field=models.ManyToManyField(blank=True, to='songs.album'),
        ),
        migrations.AddField(
            model_name='user',
            name='favorite_songs',
            field=models.ManyToManyField(blank=True, to='songs.song'),
        ),
        migrations.AlterField(
            model_name='user',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]
