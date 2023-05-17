from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from songs.models import Album, Song, AlbumTag, SongTag, Playlist, PlaylistElement
from songs.serializers import AlbumSerializer, SongSerializer, AlbumTagSerializer, SongTagSerializer, PlaylistSerializer, PlaylistElementSerializer


# @permission_classes([IsAuthenticated])  # used to only grant access to authenticated users (JWT access token in request header)
class AlbumViewset(ModelViewSet):

	serializer_class = AlbumSerializer

	def get_queryset(self):

		queryset = Album.objects.all()
			
		artist_id = self.request.GET.get('artist_id')
		if album_id is not None:
			queryset = queryset.filter(artist_id=artist_id)

		return queryset


class SongViewset(ModelViewSet):

	serializer_class = SongSerializer

	def get_queryset(self):

		queryset = Song.objects.all()
		
		album_id = self.request.GET.get('album_id')
		if album_id is not None:
			queryset = queryset.filter(album_id=album_id)

		artist_id = self.request.GET.get('artist_id')
		if album_id is not None:
			queryset = queryset.filter(artist_id=artist_id)
		
		return queryset


class AlbumTagViewset(ModelViewSet):

	serializer_class = AlbumTagSerializer

	def get_queryset(self):
		return AlbumTag.objects.all()


class SongTagViewset(ModelViewSet):

	serializer_class = SongTagSerializer

	def get_queryset(self):
		return SongTag.objects.all()


class PlaylistViewset(ModelViewSet):

	serializer_class = PlaylistSerializer

	def get_queryset(self):
		return Playlist.objects.all()



class PlaylistElementViewset(ModelViewSet):

	serializer_class = PlaylistElementSerializer

	def get_queryset(self):
		return PlaylistElement.objects.all()
