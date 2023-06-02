from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer


class UserViewset(ModelViewSet):

	serializer_class = UserSerializer

	def get_queryset(self):
			
		# self.request.user  # get current user 

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
