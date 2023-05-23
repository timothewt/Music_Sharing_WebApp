from django.contrib import admin
from songs.models import Song, Album, Playlist, PlaylistElement


class SongAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)


class AlbumAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)


admin.site.register(Song, SongAdmin)
admin.site.register(Album, AlbumAdmin)
admin.site.register(Playlist)
admin.site.register(PlaylistElement)