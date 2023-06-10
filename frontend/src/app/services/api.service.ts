import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIGetOptions } from '../models/apiget-options';
import { config } from "./config";
import { Song } from '../models/song';

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
		console.log(reqURL);
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

	public postNewAlbum(name: string, authAccessToken: string, description: string, releaseYear: string, coverFile: File) {
		let reqURL: string = this.apiURL + 'album/new/';
		let formData: FormData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('release_year', releaseYear);
		formData.append('cover_file', coverFile);
		return this.http.post(reqURL, formData, {
			headers: new HttpHeaders({
				'Authorization' : 'Bearer ' + authAccessToken
			})
		});
	}
}