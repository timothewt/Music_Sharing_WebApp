from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from songs.views import AlbumViewset, SongViewset, AlbumTagViewset, SongTagViewset

router = routers.SimpleRouter()

router.register('album', AlbumViewset, basename="album")
router.register('song', SongViewset, basename="song")
router.register('album_tag', AlbumTagViewset, basename="album_tag")
router.register('song_tag', SongTagViewset, basename="song_tag")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
