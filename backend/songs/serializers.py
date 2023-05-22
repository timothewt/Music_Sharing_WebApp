from rest_framework.serializers import ModelSerializer, SlugRelatedField
from songs.models import Song, Album, SongTag, AlbumTag, Playlist, PlaylistElement
from users.serializers import UserSerializer


class AlbumTagSerializer(ModelSerializer):

	class Meta:
		model = AlbumTag
		fields = '__all__'


class SongTagSerializer(ModelSerializer):

	class Meta:
		model = SongTag
		fields = '__all__'


class AlbumSerializer(ModelSerializer):
	artist = UserSerializer(read_only=True)
	
	class Meta:
		model = Album
		fields = ('id','release_year','name','artist','description','cover_file','cover_link','listenings')


class SongSerializer(ModelSerializer):
	album = AlbumSerializer(read_only=True)

	class Meta:
		model = Song
		fields = ('id','release_year','name','album','recording_file','recording_link','duration_ms','listenings','lyrics')


class PlaylistSerializer(ModelSerializer):

	class Meta:
		model = Playlist
		fields = '__all__'


class PlaylistElementSerializer(ModelSerializer):

	class Meta:
		model = PlaylistElement
		fields = '__all__'
