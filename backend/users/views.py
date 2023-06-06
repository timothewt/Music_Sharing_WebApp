from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from users.models import User
from users.serializers import UserSerializer


class UserViewset(ModelViewSet):

	serializer_class = UserSerializer

	def get_queryset(self):

		queryset = User.objects.all()

		search = self.request.GET.get('search')
		if search is not None:
			queryset = queryset.filter(username__icontains=search)

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
	def current_user(self, request, pk=None):
		serializer = UserSerializer(self.request.user)
		return Response(serializer.data)


	@action(methods=['post'], detail=True)
	def listen(self, request, pk=None):
		user = User.objects.filter(pk=pk).first()
		user.listenings += 1
		user.save()
		serializer = UserSerializer(user)
		return Response(serializer.data)
