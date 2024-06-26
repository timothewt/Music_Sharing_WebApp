from django.db import models
from users.models import User
from taggit.managers import TaggableManager
from config.settings import SERVER_URL


class Album(models.Model):

	date_uploaded = models.DateTimeField(auto_now_add=True)
	release_year = models.IntegerField()
	name = models.CharField(max_length=255)
	artist = models.ForeignKey(User, on_delete=models.CASCADE)
	description = models.TextField(blank=True)
	cover_link = models.CharField(max_length=255, default=SERVER_URL+"/media/default_album_cover.png")
	cover_file = models.ImageField(blank=True)
	listenings = models.IntegerField(default=0)
	tags = TaggableManager(blank=True)


	def save(self, *args, **kwargs):

		if bool(self.cover_file.name):  # checks if the file exists
			self.cover_link = SERVER_URL + self.cover_file.url
		
		super(Album, self).save(*args, **kwargs)


	def delete(self, *args, **kwargs):

		if bool(self.cover_file.name):
			self.cover_file.delete()
			super(Album, self).save(*args, **kwargs)

		super(Album, self).delete(*args, **kwargs)


	class Meta:
		constraints = [
			models.UniqueConstraint(
				fields=['name', 'artist'],
				name='Unique album names for each artist'
			)
		]


	def __str__(self):
		return f"{self.name} by {self.artist}, {self.release_year}"


class Song(models.Model):

	release_year = models.IntegerField()
	name = models.CharField(max_length=255)
	album = models.ForeignKey(Album, on_delete=models.CASCADE)
	recording_link = models.CharField(max_length=255, blank=True)
	recording_file = models.FileField(blank=True)
	duration_ms = models.IntegerField(blank=True, default=0)
	listenings = models.IntegerField(default=0)
	lyrics = models.TextField(blank=True)
	tags = TaggableManager(blank=True)


	def save(self, *args, **kwargs):
			
		if bool(self.recording_file.name):  # checks if the file exists
			print(self.recording_file.url)
			self.recording_link = SERVER_URL + self.recording_file.url

		super(Song, self).save(*args, **kwargs)


	def delete(self, *args, **kwargs):

		if bool(self.recording_file.name):
			self.recording_file.delete()
			super(Song, self).save(*args, **kwargs)

		super(Song, self).delete(*args, **kwargs)


	def __str__(self):
		return f"{self.name} by {self.album.artist} from {self.album.name}, {self.release_year}"


class Playlist(models.Model):

	date_created = models.DateTimeField(auto_now_add=True)
	date_updated = models.DateTimeField(auto_now=True)
	name = models.CharField(max_length=255)
	user = models.ForeignKey(to=User, on_delete=models.CASCADE)
	description = models.TextField(blank=True)
	listenings = models.IntegerField(default=0)
	songs = models.ManyToManyField(Song)
	deletable = models.BooleanField(default=True)
	cover_link = models.CharField(max_length=255, blank=True)
	cover_file = models.ImageField(blank=True)


	def save(self, *args, **kwargs):
			
		super(Playlist, self).save(*args, **kwargs)

		if bool(self.cover_file.name):  # checks if the file exists
			self.cover_link = SERVER_URL + self.cover_file.url
			super(Playlist, self).save(*args, **kwargs)


	class Meta:
		constraints = [
			models.UniqueConstraint(
				fields=['name', 'user'],
				name='Unique playlist names for each user'
			)
		]



	def __str__(self):
		return f"{self.name} by {self.user}"
		