from taggit.models import Tag
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from tags.serializers import MyTagSerializer


class TagViewset(ModelViewSet):

	queryset = Tag.objects.exclude(name__contains="artist").exclude(name__contains="song")
	serializer_class = MyTagSerializer
