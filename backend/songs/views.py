from rest_framework.viewsets import ModelViewSet

from songs.models import Album, Song, AlbumTag, SongTag
from songs.serializers import AlbumSerializer, SongSerializer, AlbumTagSerializer, SongTagSerializer


class AlbumViewset(ModelViewSet):

	serializer_class = AlbumSerializer

	def get_queryset(self):
		return Album.objects.all()


class SongViewset(ModelViewSet):

	serializer_class = SongSerializer

	def get_queryset(self):

		queryset = Song.objects.all()
		
		album_id = self.request.GET.get('album_id')
		if album_id is not None:
			queryset = queryset.filter(album_id=album_id)
		
		return queryset


class AlbumTagViewset(ModelViewSet):

	serializer_class = AlbumTagSerializer

	def get_queryset(self):
		return AlbumTag.objects.all()


class SongTagViewset(ModelViewSet):

	serializer_class = SongTagSerializer

	def get_queryset(self):
		return SongTag.objects.all()
