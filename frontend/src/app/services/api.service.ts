import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

	private buildRequestParemeters(options: APIGetOptions): string {
		/**
		 * Builds the request parameters for the API request. Used as a lot of request have the same parameters
		 * @param options The options for the request
		 * @returns The request parameters as a string, that can be added to the api request URL
		 */
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
		/**
		 * Gets a user by its id from the backend
		 * @param id The id of the user to get
		 * @returns The http request as an observable
		 */
		return this.http.get(this.apiURL + 'user/' + id + "/");
	}

	public getAlbumById(id: number): Observable<any> {
		/**
		 * Gets an album by its id from the backend
		 * @param id The id of the album to get
		 * @returns The http request as an observable
		 */
		return this.http.get(this.apiURL + 'album/' + id + "/");
	}

	public getSongById(id: number): Observable<any> {
		/**
		 * Gets a song by its id from the backend
		 * @param id The id of the song to get
		 * @returns The http request as an observable
		 */
		return this.http.get(this.apiURL + 'song/' + id + "/");
	}

	public getAPIURL(): string {
		/**
		 * @return The API URL
		 */
		return this.apiURL;
	}

	public getUsers(options: APIGetOptions): Observable<any> {
		/**
		 * Gets users from the backend according to the options
		 * @param options The options for the request
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/' + this.buildRequestParemeters(options);
		return this.http.get(reqURL);
	}

	public getAlbums(options: APIGetOptions): Observable<any> {
		/**
		 * Gets albums from the backend according to the options
		 * @param options The options for the request
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'album/' + this.buildRequestParemeters(options);
		return this.http.get(reqURL);
	}

	public getSongs(options: APIGetOptions): Observable<any> {
		/**
		 * Gets songs from the backend according to the options
		 * @param options The options for the request
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'song/' + this.buildRequestParemeters(options);
		return this.http.get(reqURL);
	}

	public onSongListening(song: Song): void {
		/**
		 * When listening to a song, adds 1 listen to the song, album, artist in the backend
		 * @param song The song that is being listened to
		 */
		this.addListeningToSong(song.id);
		this.addListeningToAlbum(song.album.id);
		this.addListeningToArtist(song.album.artist.id);
	} 

	private addListeningToSong(songId: number): void {
		/**
		 * Adds 1 listen to a song in the backend
		 * @param songId The id of the song to add a listen to
		 */
		let reqURL: string = this.apiURL + 'song/' + songId + '/listen/';
		this.http.post(reqURL, {}).subscribe();
	}

	private addListeningToAlbum(albumId: number): void {
		/**
		 * Adds 1 listen to an album in the backend
		 * @param albumId The id of the album to add a listen to
		 */
		let reqURL: string = this.apiURL + 'album/' + albumId + '/listen/';
		this.http.post(reqURL, {}).subscribe();
	}

	private addListeningToArtist(artistId: number): void {
		/**
		 * Adds 1 listen to an artist in the backend
		 * @param artistId The id of the artist to add a listen to
		 */
		let reqURL: string = this.apiURL + 'user/' + artistId + '/listen/';
		this.http.post(reqURL, {}).subscribe();
	}

	public getSimilarArtists(artistId: number, limit: number): Observable<any> {
		/**
		 * Gets similar artists to an artist from the backend
		 * @param artistId The id of the artist to get similar artists to
		 * @param limit The limit of similar artists to get
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/' + artistId + '/similar/?limit=' + limit;
		return this.http.get(reqURL);
	}

	public getSimilarAlbums(albumId: number, limit: number): Observable<any> {
		/**
		 * Gets similar albums to an album from the backend
		 * @param albumId The id of the album to get similar albums to
		 * @param limit The limit of similar albums to get
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'album/' + albumId + '/similar/?limit=' + limit;
		return this.http.get(reqURL);
	}

	public getSimilarSongs(songId: number, limit: number): Observable<any> {
		/**
		 * Gets similar songs to a song from the backend
		 * @param songId The id of the song to get similar songs to
		 * @param limit The limit of similar songs to get
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'song/' + songId + '/similar/?limit=' + limit;
		return this.http.get(reqURL);
	}

	public postNewAlbum(authAccessToken: string, albumUpload: UploadAlbum): Observable<any> {
		/**
		 * Posts a new album to the backend
		 * @param authAccessToken The access token of the user uploading the album
		 * @param albumUpload The album to upload
		 * @returns The http request as an observable
		 */
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

	public postNewSong(authAccessToken: string, songUpload: UploadSong): Observable<any> {
		/**
		 * Posts a new song to the backend
		 * @param authAccessToken The access token of the user uploading the song
		 * @param songUpload The song to upload
		 * @returns The http request as an observable
		 */
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

	public addSongToFavorites(songID: number, authAccessToken: string): Observable<any> {
		/**
		 * Adds a song to the user's favorites
		 * @param songID The id of the song to add to the user's favorites
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/add_song_to_favorites/';
		return this.http.post(reqURL, {'song_id': songID}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public removeSongFromFavorites(songID: number, authAccessToken: string): Observable<any> {
		/**
		 * Removes a song from the user's favorites
		 * @param songID The id of the song to remove from the user's favorites
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/remove_song_from_favorites/';
		return this.http.post(reqURL, {'song_id': songID}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public addAlbumToFavorites(albumID: number, authAccessToken: string): Observable<any> {
		/**
		 * Adds an album to the user's favorites
		 * @param albumID The id of the album to add to the user's favorites
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/add_album_to_favorites/';
		return this.http.post(reqURL, {'album_id': albumID}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public removeAlbumFromFavorites(albumID: number, authAccessToken: string): Observable<any> {
		/**
		 * Removes an album from the user's favorites
		 * @param albumID The id of the album to remove from the user's favorites
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/remove_album_from_favorites/';
		return this.http.post(reqURL, {'album_id': albumID}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public isFavoriteSong(songID: number, authAccessToken: string): Observable<any> {
		/**
		 * Checks if a song is in the user's favorites
		 * @param songID The id of the song to check
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/is_favorite_song/?song_id=' + songID;
		return this.http.get(reqURL, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public isFavoriteAlbum(albumID: number, authAccessToken: string): Observable<any> {
		/**
		 * Checks if an album is in the user's favorites
		 * @param albumID The id of the album to check
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/is_favorite_album/?album_id=' + albumID;
		return this.http.get(reqURL, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public getFavoriteSongs(authAccessToken: string): Observable<any> {
		/**
		 * Gets the user's favorite songs
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/get_favorite_songs/';
		return this.http.get(reqURL, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public getFavoriteAlbums(authAccessToken: string): Observable<any> {
		/**
		 * Gets the user's favorite albums
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/get_favorite_albums/';
		return this.http.get(reqURL, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public changeProfilePic(authAccessToken: string, pfpFile: File): Observable<any> {
		/**
		 * Changes the user's profile picture
		 * @param authAccessToken The access token of the user
		 * @param pfpFile The new profile picture
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/change_pfp/';
		let formData: FormData = new FormData();

		formData.append('pfp_file', pfpFile);

		return this.http.post(reqURL, formData, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public getTags(): Observable<any> {
		/**
		 * Gets the list of tags available in the backend
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'tags/';
		return this.http.get(reqURL);
	}

	public deleteUser(authAccessToken: string) : Observable<any>{
		/**
		 * Deletes the user's account
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'user/delete/';
		return this.http.post(reqURL, {}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public deleteAlbum(albumId: number, authAccessToken: string): Observable<any> {
		/**
		 * Deletes an album from the user
		 * @param albumId The id of the album to delete
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'album/' + albumId + '/delete/';
		return this.http.post(reqURL, {'album_id': albumId}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}

	public deleteSong(songId: number, authAccessToken: string): Observable<any> {
		/**
		 * Deletes a song from the user
		 * @param songId The id of the song to delete
		 * @param authAccessToken The access token of the user
		 * @returns The http request as an observable
		 */
		let reqURL: string = this.apiURL + 'song/' + songId + '/delete/';
		return this.http.post(reqURL, {'song_id': songId}, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}
}