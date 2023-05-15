from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from users.models import User
from users.serializers import UserSerializer


class UserAPIView(RetrieveAPIView):
	permission_classes = (IsAuthenticated,)
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user