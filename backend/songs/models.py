from django.db import models
from users.models import User


class Album(models.Model):

	date_uploaded = models.DateTimeField(auto_now_add=True)
	release_year = models.IntegerField()
	name = models.CharField(max_length=255)
	artist = models.ForeignKey(User, on_delete=models.CASCADE)
	description = models.TextField(blank=True)
	cover_link = models.CharField(max_length=255, blank=True)
	cover_file = models.ImageField(blank=True)
	listenings = models.IntegerField(default=0)

	def save(self, *args, **kwargs):
			
		super(Album, self).save(*args, **kwargs)

		if bool(self.cover_file.name):  # checks if the file exists
			self.cover_link = SERVER_URL + self.cover_file.url
			super(Album, self).save(*args, **kwargs)

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
	recording_file = models.FileField(upload_to="media/uploaded_songs/", blank=True)
	duration_ms = models.IntegerField(blank=True, default=0)
	listenings = models.IntegerField(default=0)
	lyrics = models.TextField(blank=True)

	def save(self, *args, **kwargs):
			
		super(Song, self).save(*args, **kwargs)

		if bool(self.recording_file.name):  # checks if the file exists
			self.recording_link = SERVER_URL + self.recording_file.url
			super(Song, self).save(*args, **kwargs)

	def __str__(self):
		return f"{self.name} by {self.album.artist} from {self.album.name}, {self.release_year}"


class AlbumTag(models.Model):

	tag = models.CharField(max_length=255)
	album = models.ForeignKey(Album, on_delete=models.CASCADE)

	def __str__(self):
		return f"{self.tag} : {self.album}"


class SongTag(models.Model):

	tag = models.CharField(max_length=255)
	song = models.ForeignKey(Song, on_delete=models.CASCADE)

	def __str__(self):
		return f"{self.tag} : {self.song}"


class Playlist(models.Model):

	date_created = models.DateTimeField(auto_now_add=True)
	date_updated = models.DateTimeField(auto_now=True)
	name = models.CharField(max_length=255)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	description = models.TextField(blank=True)

	class Meta:
		constraints = [
			models.UniqueConstraint(
				fields=['name', 'user'],
				name='Unique playlist names for each user'
			)
		]

	def __str__(self):
		return f"{self.name} by {self.user}"


class PlaylistElement(models.Model):

	playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
	song = models.ForeignKey(Song, on_delete=models.CASCADE)

	def __str__(self):
		return f"Song {self.song} in playlist {self.playlist}"
