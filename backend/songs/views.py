from urllib.parse import unquote
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, action
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from users.models import User
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
			queryset = queryset.filter(name__icontains=unquote(search))


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


	@action(methods=['get'], detail=True)
	def similar(self, request, pk=None):

		album = Album.objects.filter(pk=pk).first()

		similar_albums = album.tags.similar_objects()

		if (limit := self.request.GET.get('limit')) is not None:
			similar_albums = similar_albums[:int(limit)]

		serializer = AlbumSerializer(similar_albums, many=True)
		return Response(serializer.data)


	@action(methods=['post'], detail=False)
	def new(self, request, pk=None):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		if Album.objects.filter(name=request.data['name'], artist=request.user).exists():
			return Response({'error': 'Album name already exists'},
							status=HTTP_400_BAD_REQUEST)

		album = Album.objects.create(
			name=request.data['name'],
			artist=request.user,
			cover_file=request.FILES.get('cover_file'),
			description=request.data['description'],
			release_year=int(request.data['release_year']),
		)
		album.save()

		serializer = AlbumSerializer(album)
		return Response(serializer.data)


	@action(methods=['post'], detail=True)
	def delete(self, request, pk=None):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		album = Album.objects.filter(pk=pk).first()

		if album.artist != request.user:
			return Response({"detail": "You are not the owner of this album."}, status=401)

		album.delete()
		return Response({'success': 'Album deleted'})


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
			queryset = queryset.filter(name__icontains=unquote(search))

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


	@action(methods=['get'], detail=True)
	def similar(self, request, pk=None):

		song = Song.objects.filter(pk=pk).first()
		similar_songs = song.tags.similar_objects()

		if (limit := self.request.GET.get('limit')) is not None:
			similar_songs = similar_songs[:int(limit)]

		serializer = SongSerializer(similar_songs, many=True)
		return Response(serializer.data)


	@action(methods=['post'], detail=False)
	def new(self, request, pk=None):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		album = Album.objects.filter(pk=int(request.data['album_id'])).first()

		song = Song.objects.create(
			name=request.data['name'],
			album=album,
			recording_file=request.FILES.get('recording_file'),
			duration_ms=int(request.data['duration_ms']),
			release_year=int(request.data['release_year']),
		)

		if request.data.get('tags'):
			for tag in request.data['tags']:
				album.tags.add(tag)
				song.tags.add(f"song-{tag}")
				self.request.user.tags.add(f"artist-{tag}")

		album.save()
		song.save()

		serializer = SongSerializer(song)
		return Response(serializer.data)


	@action(methods=['post'], detail=True)
	def delete(self, request, pk=None):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		song = Song.objects.filter(pk=pk).first()

		if song.album.artist != request.user:
			return Response({"detail": "You are not the owner of this song."}, status=401)

		song.delete()
		return Response({'success': 'Song deleted'})


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

