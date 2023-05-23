import pandas as pd
from users.models import User
from songs.models import Album, Song
import random
import string


def insert_artists():  # execute first
	artists = pd.read_csv("db_data/artists.csv")
	for i in range(len(artists)):
		artist = User.objects.create_user(artists.loc[i,"name"], password=''.join(random.choices(string.ascii_uppercase + string.digits, k=16)))
		artist.profile_pic_link = artists.loc[i, "profile_pic"]
		artist.save()


def insert_albums():  # execute second
	albums = pd.read_csv("db_data/albums.csv")
	for i in range(len(albums)):
		artist = User.objects.filter(username=albums.loc[i,"artist"]).first()
		album = Album(name=albums.loc[i,"name"], release_year=albums.loc[i,"year"], artist=artist, description='', cover_link=albums.loc[i,"cover_link"])
		
		try:
			for tag in albums.loc[i, "tags"].split(", "):
				album.tags.add(tag)
		except:
			print(f"Could not save tags for album {album.name}")

		album.save()


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
		
		try:
			for tag in songs.loc[i, "tags"].split(", "):
				song.tags.add(tag)
		except:
			print(f"Could not save tags for song {song.name}")

		song.save()


def insert_times():
	songs = pd.read_csv("db_data/songs.csv")
	for i in range(len(songs)):
		song = Song.objects.filter(recording_link=songs.loc[i,"spotify_preview_url"]).first()

		if song is not None:
			song.duration_ms = songs.loc[i, "duration_ms"]
			song.save()
