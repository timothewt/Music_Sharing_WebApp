from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer


class UserViewset(ModelViewSet):

	serializer_class = UserSerializer

	def get_queryset(self):
			
		# self.request.user  # get current user 

		return User.objects.all()
