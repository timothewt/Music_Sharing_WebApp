from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from urllib.parse import unquote
from rest_framework.status import HTTP_400_BAD_REQUEST
from songs.models import Song, Album
from users.models import User
from users.serializers import UserSerializer
from songs.serializers import SongSerializer, AlbumSerializer


class UserViewset(ModelViewSet):

	serializer_class = UserSerializer

	def get_queryset(self):

		queryset = User.objects.all()

		search = self.request.GET.get('search')
		if search is not None:
			queryset = queryset.filter(username__icontains=unquote(search))

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


	@action(methods=['get'], detail=False)
	def current_user(self, request):
		serializer = UserSerializer(self.request.user)
		return Response(serializer.data)


	@action(methods=['post'], detail=True)
	def listen(self, request, pk=None):
		user = User.objects.filter(pk=pk).first()
		user.listenings += 1
		user.save()
		serializer = UserSerializer(user)
		return Response(serializer.data)


	@action(methods=['post'], detail=False)
	def register(self, request):
		username = request.data.get('username')
		password = request.data.get('password')
		confirm_password = request.data.get('confirm_password')
		email = request.data.get('email')

		if username is None or password is None or confirm_password is None or email is None:
			return Response({'error': 'Please provide username, password and email'},
							status=HTTP_400_BAD_REQUEST)
		if password != confirm_password:
			return Response({'error': 'Passwords do not match'},
							status=HTTP_400_BAD_REQUEST)
		if User.objects.filter(username=username).exists():
			return Response({'error': 'Username already exists'},
							status=HTTP_400_BAD_REQUEST)
		if User.objects.filter(email=email).exists():
			return Response({'error': 'Email already exists'},
							status=HTTP_400_BAD_REQUEST)
		
		user = User.objects.create_user(username=username, email=email, password=password)

		serializer = UserSerializer(user)
		return Response(serializer.data)


	@action(methods=['get'], detail=True)
	def similar(self, request, pk=None):

		user = User.objects.filter(pk=pk).first()
		similar_users = user.tags.similar_objects()

		if (limit := self.request.GET.get('limit')) is not None:
			similar_users = similar_users[:int(limit)]

		serializer = UserSerializer(similar_users, many=True)
		return Response(serializer.data)


	@action(methods=['post'], detail=False)
	def add_song_to_favorites(self, request):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		song_id = request.data.get('song_id')
		if song_id is None:
			return Response({'error': 'Please provide song_id'},
							status=HTTP_400_BAD_REQUEST)

		song = Song.objects.filter(pk=song_id).first()
		if song is None:
			return Response({'error': 'Song does not exist'},
							status=HTTP_400_BAD_REQUEST)

		request.user.favorite_songs.add(song)
		request.user.save()

		serializer = UserSerializer(request.user)
		return Response(serializer.data)


	@action(methods=['post'], detail=False)
	def remove_song_from_favorites(self, request):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		song_id = request.data.get('song_id')
		if song_id is None:
			return Response({'error': 'Please provide song_id'},
							status=HTTP_400_BAD_REQUEST)

		song = Song.objects.filter(pk=song_id).first()
		if song is None:
			return Response({'error': 'Song does not exist'},
							status=HTTP_400_BAD_REQUEST)

		request.user.favorite_songs.remove(song)
		request.user.save()

		serializer = UserSerializer(request.user)
		return Response(serializer.data)


	@action(methods=['post'], detail=False)
	def add_album_to_favorites(self, request):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		album_id = request.data.get('album_id')
		if album_id is None:
			return Response({'error': 'Please provide album_id'},
							status=HTTP_400_BAD_REQUEST)

		album = Album.objects.filter(pk=album_id).first()
		if album is None:
			return Response({'error': 'Album does not exist'},
							status=HTTP_400_BAD_REQUEST)

		request.user.favorite_albums.add(album)
		request.user.save()

		serializer = UserSerializer(request.user)
		return Response(serializer.data)


	@action(methods=['post'], detail=False)
	def remove_album_from_favorites(self, request):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		album_id = request.data.get('album_id')
		if album_id is None:
			return Response({'error': 'Please provide album_id'},
							status=HTTP_400_BAD_REQUEST)

		album = Album.objects.filter(pk=album_id).first()
		if album is None:
			return Response({'error': 'Album does not exist'},
							status=HTTP_400_BAD_REQUEST)

		request.user.favorite_albums.remove(album)
		request.user.save()

		serializer = UserSerializer(request.user)
		return Response(serializer.data)


	@action(methods=['get'], detail=False)
	def get_favorite_songs(self, request):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		limit = self.request.GET.get('limit')
		offset = self.request.GET.get('offset')

		queryset = request.user.favorite_songs.all()

		if limit is not None:
			if offset is not None:
				queryset = queryset[int(offset):int(offset)+int(limit)]
			else:
				queryset = queryset[:int(limit)]

		serializer = SongSerializer(queryset, many=True)
		return Response(serializer.data)


	@action(methods=['get'], detail=False)
	def get_favorite_albums(self, request):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		limit = self.request.GET.get('limit')
		offset = self.request.GET.get('offset')

		queryset = request.user.favorite_albums.all()

		if limit is not None:
			if offset is not None:
				queryset = queryset[int(offset):int(offset)+int(limit)]
			else:
				queryset = queryset[:int(limit)]

		serializer = AlbumSerializer(queryset, many=True)
		return Response(serializer.data)


	@action(methods=['get'], detail=False)
	def is_favorite_song(self, request):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		song_id = self.request.GET.get('song_id')
		if song_id is None:
			return Response({'error': 'Please provide song_id'},
							status=HTTP_400_BAD_REQUEST)

		return Response({'is_favorite': request.user.favorite_songs.filter(pk=int(song_id)).exists()})


	@action(methods=['get'], detail=False)
	def is_favorite_album(self, request):

		if not request.user.is_authenticated:
			return Response({"detail": "Authentication credentials were not provided."}, status=401)

		album_id = self.request.GET.get('album_id')
		if album_id is None:
			return Response({'error': 'Please provide album_id'},
							status=HTTP_400_BAD_REQUEST)

		return Response({'is_favorite': request.user.favorite_albums.filter(pk=int(album_id)).exists()})
		