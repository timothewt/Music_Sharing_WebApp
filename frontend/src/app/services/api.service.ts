import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { APIGetOptions } from '../models/apiget-options';
import { config } from "./config";
import { Song } from '../models/song';
import { UploadAlbum } from '../models/uploadAlbum';
import { UploadSong } from '../models/uploadSong';

@Injectable()
export class APIService {

	apiURL: string = "";

	constructor(private http: HttpClient) {
		this.apiURL = config.apiURL;
	}

	private buildRequestParemeters(options: APIGetOptions) {
		let requestParameters: string = "?";
		if (options.limit) {
			requestParameters += "&limit=" + options.limit;
		}
		if (options.mostPopular) {
			requestParameters += "&most_popular";
		}
		if (options.searchedValue) {
			requestParameters += '&search=' + options.searchedValue;
		}
		if (options.offset) {
			requestParameters += "&offset=" + options.offset;
		}
		if (options.artistId) {
			requestParameters += "&artist_id=" + options.artistId;
		}
		if (options.albumId) {
			requestParameters += "&album_id=" + options.albumId;
		}
		return requestParameters;
	}

	public getUserById(id: number): Observable<any> {
		return this.http.get(this.apiURL + 'user/' + id + "/");
	}

	public getAlbumById(id: number): Observable<any> {
		return this.http.get(this.apiURL + 'album/' + id + "/");
	}

	public getSongById(id: number): Observable<any> {
		return this.http.get(this.apiURL + 'song/' + id + "/");
	}

	public getAPIURL(): string {
		return this.apiURL;
	}

	public getUsers(options: APIGetOptions) {
		let reqURL: string = this.apiURL + 'user/' + this.buildRequestParemeters(options);
		return this.http.get(reqURL);
	}

	public getAlbums(options: APIGetOptions) {
		let reqURL: string = this.apiURL + 'album/' + this.buildRequestParemeters(options);
		return this.http.get(reqURL);
	}

	public getSongs(options: APIGetOptions) {
		let reqURL: string = this.apiURL + 'song/' + this.buildRequestParemeters(options);
		return this.http.get(reqURL);
	}

	public onSongListening(song: Song): void {
		this.addListeningToSong(song.id);
		this.addListeningToAlbum(song.album.id);
		this.addListeningToArtist(song.album.artist.id);
	} 

	private addListeningToSong(songId: number) {
		let reqURL: string = this.apiURL + 'song/' + songId + '/listen/';
		this.http.post(reqURL, {}).subscribe();
	}

	private addListeningToAlbum(albumId: number) {
		let reqURL: string = this.apiURL + 'album/' + albumId + '/listen/';
		this.http.post(reqURL, {}).subscribe();
	}

	private addListeningToArtist(artistId: number) {
		let reqURL: string = this.apiURL + 'user/' + artistId + '/listen/';
		this.http.post(reqURL, {}).subscribe();
	}

	public getSimilarArtists(artistId: number, limit: number) {
		let reqURL: string = this.apiURL + 'user/' + artistId + '/similar/?limit=' + limit;
		return this.http.get(reqURL);
	}

	public getSimilarAlbums(albumId: number, limit: number) {
		let reqURL: string = this.apiURL + 'album/' + albumId + '/similar/?limit=' + limit;
		return this.http.get(reqURL);
	}

	public getSimilarSongs(songId: number, limit: number) {
		let reqURL: string = this.apiURL + 'song/' + songId + '/similar/?limit=' + limit;
		return this.http.get(reqURL);
	}

	public postNewAlbum(authAccessToken: string, albumUpload: UploadAlbum) {
		let reqURL: string = this.apiURL + 'album/new/';
		let formData: FormData = new FormData();

		// Add album to form data
		formData.append('name', albumUpload.name);
		formData.append('description', albumUpload.description);
		formData.append('release_year', albumUpload.releaseYear.toString());
		formData.append('cover_file', albumUpload.coverFile);

		return this.http.post(reqURL, formData, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public postNewSong(authAccessToken: string, songUpload: UploadSong) {
		let reqURL: string = this.apiURL + 'song/new/';
		let formData: FormData = new FormData();

		formData.append('album_id', songUpload.album.id.toString());
		formData.append('name', songUpload.name);
		formData.append('recording_file', songUpload.recordingFile);
		formData.append('duration_ms', songUpload.duration.toString());
		formData.append('release_year', songUpload.releaseYear.toString());

		for (let tag of songUpload.tags) {
			formData.append('tags', tag);
		}

		return this.http.post(reqURL, formData, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
		
	}

	public addSongToFavorites(songID: number, authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/add_song_to_favorites/';
		return this.http.post(reqURL, {'song_id': songID}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public removeSongFromFavorites(songID: number, authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/remove_song_from_favorites/';
		return this.http.post(reqURL, {'song_id': songID}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public addAlbumToFavorites(albumID: number, authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/add_album_to_favorites/';
		return this.http.post(reqURL, {'album_id': albumID}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public removeAlbumFromFavorites(albumID: number, authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/remove_album_from_favorites/';
		return this.http.post(reqURL, {'album_id': albumID}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public isFavoriteSong(songID: number, authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/is_favorite_song/?song_id=' + songID;
		return this.http.get(reqURL, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public isFavoriteAlbum(albumID: number, authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/is_favorite_album/?album_id=' + albumID;
		return this.http.get(reqURL, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public getFavoriteSongs(authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/get_favorite_songs/';
		return this.http.get(reqURL, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public getFavoriteAlbums(authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/get_favorite_albums/';
		return this.http.get(reqURL, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public changeProfilePic(authAccessToken: string, pfpFile: File) {
		let reqURL: string = this.apiURL + 'user/change_pfp/';
		let formData: FormData = new FormData();

		formData.append('pfp_file', pfpFile);

		return this.http.post(reqURL, formData, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public getTags() {
		let reqURL: string = this.apiURL + 'tags/';
		return this.http.get(reqURL);
	}

	public deleteUser(authAccessToken: string) {
		let reqURL: string = this.apiURL + 'user/delete/';
		return this.http.post(reqURL, {}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public deleteAlbum(albumId: number, authAccessToken: string) {
		let reqURL: string = this.apiURL + 'album/' + albumId + '/delete/';
		return this.http.post(reqURL, {'album_id': albumId}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public deleteSong(songId: number, authAccessToken: string) {
		let reqURL: string = this.apiURL + 'song/' + songId + '/delete/';
		return this.http.post(reqURL, {'song_id': songId}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}
}