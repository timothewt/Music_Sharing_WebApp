from rest_framework.serializers import ModelSerializer
from songs.models import Song, Album, SongTag, AlbumTag, Playlist, PlaylistElement


class AlbumTagSerializer(ModelSerializer):

	class Meta:
		model = AlbumTag
		fields = '__all__'


class SongTagSerializer(ModelSerializer):

	class Meta:
		model = SongTag
		fields = '__all__'


class AlbumSerializer(ModelSerializer):
	
	class Meta:
		model = Album
		fields = '__all__'


class SongSerializer(ModelSerializer):

	class Meta:
		model = Song
		fields = '__all__'


class PlaylistSerializer(ModelSerializer):

	class Meta:
		model = Playlist
		fields = '__all__'


class PlaylistElementSerializer(ModelSerializer):

	class Meta:
		model = PlaylistElement
		fields = '__all__'
