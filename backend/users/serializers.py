from rest_framework.serializers import ModelSerializer
from users.models import User
from taggit.serializers import TagListSerializerField


class UserSerializer(ModelSerializer):
	tags = TagListSerializerField()

	class Meta:
		model = User
		fields = ('id','username','email','date_joined','description','profile_pic','profile_pic_link','banner_link','favorite_songs','favorite_albums','listenings','tags')
		