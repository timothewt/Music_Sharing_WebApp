from django.contrib import admin
from songs.models import Song, Album, SongTag, AlbumTag

admin.site.register(Song)
admin.site.register(Album)
admin.site.register(SongTag)
admin.site.register(AlbumTag)