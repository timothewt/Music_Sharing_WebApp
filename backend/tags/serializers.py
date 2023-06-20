from rest_framework.serializers import ModelSerializer
from taggit.models import Tag


class MyTagSerializer(ModelSerializer):

    class Meta:
        model = Tag
        fields = ['name', 'slug']