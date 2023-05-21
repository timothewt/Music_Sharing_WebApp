from django.contrib import admin
from users.models import User


class UserAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)


admin.site.register(User, UserAdmin)