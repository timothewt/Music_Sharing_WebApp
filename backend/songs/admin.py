from django.contrib import admin
from songs.models import Song, Album, SongTag, AlbumTag, Playlist, PlaylistElement


class SongAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)

admin.site.register(Song, SongAdmin)


class AlbumAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)

admin.site.register(Album, AlbumAdmin)


admin.site.register(SongTag)
admin.site.register(AlbumTag)
admin.site.register(Playlist)
admin.site.register(PlaylistElement)