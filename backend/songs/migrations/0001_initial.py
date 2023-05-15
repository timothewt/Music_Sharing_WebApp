# Generated by Django 4.2.1 on 2023-05-15 18:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_uploaded', models.DateTimeField(auto_now_add=True)),
                ('release_year', models.IntegerField()),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('cover_link', models.CharField(max_length=255)),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_uploaded', models.DateTimeField(auto_now_add=True)),
                ('release_year', models.IntegerField()),
                ('name', models.CharField(max_length=255)),
                ('recording_link', models.CharField(max_length=255)),
                ('track_number', models.IntegerField()),
                ('duration_ms', models.IntegerField()),
                ('explicit', models.BooleanField(default=False)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='songs.album')),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SongTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=255)),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='songs.song')),
            ],
        ),
        migrations.CreateModel(
            name='AlbumTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=255)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='songs.album')),
            ],
        ),
    ]
