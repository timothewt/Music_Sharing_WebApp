from rest_framework.serializers import ModelSerializer, SlugRelatedField
from taggit.serializers import TagListSerializerField, TaggitSerializer
from songs.models import Song, Album, Playlist, PlaylistElement
from users.serializers import UserSerializer


class AlbumSerializer(TaggitSerializer, ModelSerializer):
	artist = UserSerializer(read_only=True)
	tags = TagListSerializerField()
	
	class Meta:
		model = Album
		fields = ('id','release_year','name','artist','description','cover_file','cover_link','listenings','tags')


class SongSerializer(TaggitSerializer, ModelSerializer):
	album = AlbumSerializer(read_only=True)
	tags = TagListSerializerField()

	class Meta:
		model = Song
		fields = ('id','release_year','name','album','recording_file','recording_link','duration_ms','listenings','lyrics','tags')


class PlaylistSerializer(ModelSerializer):

	class Meta:
		model = Playlist
		fields = '__all__'


class PlaylistElementSerializer(ModelSerializer):

	class Meta:
		model = PlaylistElement
		fields = '__all__'
