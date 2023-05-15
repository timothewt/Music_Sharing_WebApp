from django.db import models
from users.models import User


class Album(models.Model):

	date_uploaded = models.DateTimeField(auto_now_add=True)
	release_year = models.IntegerField()
	name = models.CharField(max_length=255)
	artist = models.ForeignKey(User, on_delete=models.CASCADE)
	description = models.TextField(blank=True)
	cover_link = models.CharField(max_length=255, blank=True)

	def __str__(self):
		return f"{self.name} by {self.artist}, {self.release_year}"


class Song(models.Model):

	date_uploaded = models.DateTimeField(auto_now_add=True, editable=False)
	release_year = models.IntegerField()
	name = models.CharField(max_length=255)
	artist = models.ForeignKey(User, on_delete=models.CASCADE)
	album = models.ForeignKey(Album, on_delete=models.CASCADE)
	recording_link = models.CharField(max_length=255)
	track_number = models.IntegerField()
	duration_ms = models.IntegerField(blank=True, default=0)
	explicit = models.BooleanField(default=False)
	# danceability = models.DecimalField(max_digits=4, decimal_places=3)
	# energy = models.DecimalField(max_digits=4, decimal_places=3)
	# loudness = models.DecimalField(max_digits=5, decimal_places=3)
	# speechiness = models.DecimalField(max_digits=5, decimal_places=4)
	# acousticness = models.DecimalField(max_digits=5, decimal_places=4)

	def __str__(self):
		return f"{self.name} by {self.artist} from {self.album.name}, {self.release_year}"


class SongTag(models.Model):

	tag = models.CharField(max_length=255)
	song = models.ForeignKey(Song, on_delete=models.CASCADE)

	def __str__(self):
		return self.tag


class AlbumTag(models.Model):

	tag = models.CharField(max_length=255)
	album = models.ForeignKey(Album, on_delete=models.CASCADE)

	def __str__(self):
		return self.tag


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