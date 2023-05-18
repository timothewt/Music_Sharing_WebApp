import pandas as pd
from users.models import User
from songs.models import Album, AlbumTag, Song, SongTag
import random
import string


def insert_artists():  # execute first
	artists = pd.read_csv("db_data/artists.csv")
	for i in range(len(artists)):
		artist = User.objects.filter(username=artists.loc[i, "name"]).first()
		artist.profile_pic_link = artists.loc[i, "profile_pic"]
		artist.save()
		# User.objects.create_user(artists.loc[i,"name"], password=''.join(random.choices(string.ascii_uppercase + string.digits, k=16)))


def insert_albums():  # execute second
	albums = pd.read_csv("db_data/albums.csv")
	for i in range(len(albums)):
		artist = User.objects.filter(username=albums.loc[i,"artist"]).first()
		album = Album(name=albums.loc[i,"name"], release_year=albums.loc[i,"year"], artist=artist, description='', cover_link=albums.loc[i,"cover_link"])
		album.save()
		try:
			for tag in albums.loc[i,"tags"].split(', '):
				album_tag = AlbumTag(tag=tag, album=album)
				album_tag.save()
		except AttributeError:
			print(f"Unable to insert tag : {albums.loc[i,'tags']}, from album {album}")


def insert_songs():  # execute third
	songs = pd.read_csv("db_data/songs.csv")
	for i in range(len(songs)):
		artist = User.objects.filter(username=songs.loc[i,"artist"]).first()
		if artist is None:
			continue

		album = Album.objects.filter(artist=artist, name=songs.loc[i,"album"]).first()
		if album is None:
			continue

		song = Song(name=songs.loc[i,"name"], release_year=songs.loc[i,"year"], artist=artist, album=album, recording_link=songs.loc[i,"spotify_preview_url"], duration_ms=songs.loc[i,"duration_ms"])
		song.save()

		try:
			for tag in songs.loc[i,"tags"].split(', '):
				song_tag = SongTag(tag=tag, song=song)
				song_tag.save()
		except AttributeError:
			print(f"Unable to insert tag : {songs.loc[i,'tags']}, from song {song}")
