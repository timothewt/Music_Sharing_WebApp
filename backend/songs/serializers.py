from rest_framework.serializers import ModelSerializer, SlugRelatedField
from taggit.serializers import TagListSerializerField, TaggitSerializer
from users.serializers import UserSerializer
from songs.models import Album, Song, Playlist


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
	songs = SongSerializer(many=True, read_only=True)

	class Meta:
		model = Playlist
		fields = ('id','name','songs')