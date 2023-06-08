from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from urllib.parse import unquote
from rest_framework.status import HTTP_400_BAD_REQUEST
from songs.models import Playlist, Album
from users.models import User
from users.serializers import UserSerializer


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

		user_favorites = Playlist.objects.create(name="Favorites", user=user, deletable=False)

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
