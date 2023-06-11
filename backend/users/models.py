from django.db import models
from django.contrib.auth.models import AbstractUser
from config.settings import SERVER_URL
from taggit.managers import TaggableManager

class User(AbstractUser):

	description = models.TextField(blank=True)
	profile_pic = models.ImageField(blank=True)
	profile_pic_link = models.CharField(max_length=255, blank=True, default=SERVER_URL + "/media/default_pfp.jpg")
	banner = models.ImageField(blank=True)
	banner_link = models.CharField(max_length=255, blank=True)
	listenings = models.IntegerField(default=0)
	tags = TaggableManager(blank=True)
	favorite_songs = models.ManyToManyField('songs.Song', blank=True)
	favorite_albums = models.ManyToManyField('songs.Album', blank=True)


	def save(self, *args, **kwargs):
			
		super(User, self).save(*args, **kwargs)

		if bool(self.banner.name):  # checks if the file exists
			self.banner_link = SERVER_URL + self.banner.url
			super(User, self).save(*args, **kwargs)

		if bool(self.profile_pic.name):
			self.profile_pic_link = SERVER_URL + self.profile_pic.url
			super(User, self).save(*args, **kwargs)


	def __str__(self):
		return self.username
