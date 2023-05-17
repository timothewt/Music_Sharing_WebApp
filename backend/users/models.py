from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

	description = models.TextField(blank=True)
	profile_pic = models.ImageField(blank=True)
	profile_pic_link = models.CharField(max_length=255, blank=True)
	banner = models.ImageField(blank=True)
	banner_link = models.CharField(max_length=255, blank=True)

	def __str__(self):
		return self.username