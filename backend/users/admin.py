from django.contrib import admin
from users.models import User


class UserAdmin(admin.ModelAdmin):
	readonly_fields = ('id','favorite_songs','favorite_albums')
	list_filter = ('username',)


admin.site.register(User, UserAdmin)