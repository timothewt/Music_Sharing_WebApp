from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, action
from rest_framework.response import Response

from songs.models import Album, Song, Playlist
from songs.serializers import AlbumSerializer, SongSerializer, PlaylistSerializer


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


	@action(methods=['post'], detail=True)
	def listen(self, request, pk=None):
		album = Album.objects.filter(pk=pk).first()
		album.listenings += 1
		album.save()
		serializer = AlbumSerializer(album)
		return Response(serializer.data)


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


	@action(methods=['post'], detail=True)
	def listen(self, request, pk=None):
		song = Song.objects.filter(pk=pk).first()
		song.listenings += 1
		song.save()
		serializer = SongSerializer(song)
		return Response(serializer.data)


class PlaylistViewset(ModelViewSet):

	serializer_class = PlaylistSerializer

	def get_queryset(self):

		queryset = Playlist.objects.all()

		user_id = self.request.GET.get('user_id')
		if user_id is not None:
			queryset = queryset.filter(user_id=user_id)

		return queryset


	@action(methods=['post'], detail=True)
	def listen(self, request, pk=None):
		playlist = Playlist.objects.filter(pk=pk).first()
		playlist.listenings += 1
		playlist.save()
		serializer = PlaylistSerializer(playlist)
		return Response(serializer.data)

