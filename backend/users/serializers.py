from rest_framework.serializers import ModelSerializer
from users.models import User


class UserSerializer(ModelSerializer):

	class Meta:
		model = User
		fields = ('id','username','email','date_joined','description','profile_pic','profile_pic_link','banner','banner_link')
		