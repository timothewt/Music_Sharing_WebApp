from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from config.settings import MEDIA_URL, MEDIA_ROOT

from songs.views import AlbumViewset, SongViewset
from users.views import UserViewset


router = routers.SimpleRouter()  # used to access all the views of the API

router.register('album', AlbumViewset, basename="album")
router.register('song', SongViewset, basename="song")
router.register('user', UserViewset, basename="user")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
] + static(MEDIA_URL, document_root=MEDIA_ROOT)
