from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from songs.models import Album, Song, Playlist, PlaylistElement
from songs.serializers import AlbumSerializer, SongSerializer, PlaylistSerializer, PlaylistElementSerializer


# @permission_classes([IsAuthenticated])  # used to only grant access to authenticated users (JWT access token in request header)
class AlbumViewset(ModelViewSet):

	serializer_class = AlbumSerializer

	def get_queryset(self):

		queryset = Album.objects.all()
			
		artist_id = self.request.GET.get('artist_id')
		if artist_id is not None:
			queryset = queryset.filter(artist_id=artist_id)

		search = self.request.GET.get('search')
		if search is not None:
			queryset = queryset.filter(name__icontains=search)


		most_popular = self.request.GET.get('most_popular')
		if most_popular is not None:
			queryset = queryset.order_by("-listenings")

		limit = self.request.GET.get('limit')
		offset = self.request.GET.get('offset')
		if limit is not None:
			if offset is not None:
				queryset = queryset[int(offset):int(offset) + int(limit)]
			else:
				queryset = queryset[:int(limit)]

		return queryset


class SongViewset(ModelViewSet):

	serializer_class = SongSerializer

	def get_queryset(self):

		queryset = Song.objects.all()
		
		album_id = self.request.GET.get('album_id')
		if album_id is not None:
			queryset = queryset.filter(album_id=album_id)

		artist_id = self.request.GET.get('artist_id')
		if artist_id is not None:
			queryset = queryset.filter(album__artist_id=artist_id)

		search = self.request.GET.get('search')
		if search is not None:
			queryset = queryset.filter(name__icontains=search)

		most_popular = self.request.GET.get('most_popular')
		if most_popular is not None:
			queryset = queryset.order_by("-listenings")

		limit = self.request.GET.get('limit')
		offset = self.request.GET.get('offset')
		if limit is not None:
			if offset is not None:
				queryset = queryset[int(offset):int(offset) + int(limit)]
			else:
				queryset = queryset[:int(limit)]
		
		return queryset


class PlaylistViewset(ModelViewSet):

	serializer_class = PlaylistSerializer

	def get_queryset(self):

		queryset = Playlist.objects.all()

		user_id = self.request.GET.get('user_id')
		if user_id is not None:
			queryset = queryset.filter(user_id=user_id)

		return queryset



class PlaylistElementViewset(ModelViewSet):

	serializer_class = PlaylistElementSerializer

	def get_queryset(self):

		queryset = PlaylistElement.objects.all()

		playlist_id = self.request.GET.get('playlist_id')
		if playlist_id is not None:
			queryset = queryset.filter(playlist_id=playlist_id)
			
		return queryset
