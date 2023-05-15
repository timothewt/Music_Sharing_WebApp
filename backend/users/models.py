from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

	description = models.TextField(blank=True)
	profile_pic = models.ImageField(blank=True)

	def __str__(self):
		return self.username