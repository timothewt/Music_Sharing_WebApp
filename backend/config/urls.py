from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from songs.views import AlbumViewset, SongViewset, AlbumTagViewset, SongTagViewset
from users.views import UserAPIView


router = routers.SimpleRouter()

router.register('album', AlbumViewset, basename="album")
router.register('song', SongViewset, basename="song")
router.register('album_tag', AlbumTagViewset, basename="album_tag")
router.register('song_tag', SongTagViewset, basename="song_tag")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/', UserAPIView.as_view(), name="user"),
    path('api/', include(router.urls)),
]
