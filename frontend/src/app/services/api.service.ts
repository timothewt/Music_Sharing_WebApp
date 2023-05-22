import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class APIService {

	apiURL: string = "http://127.0.0.1:8000/api/";

	constructor(private http: HttpClient) {}

	public getUserById(id: number): Observable<any> {
		return this.http.get(this.apiURL + 'user/' + id + "/");
	}

	public getAlbumById(id: number): Observable<any> {
		return this.http.get(this.apiURL + 'album/' + id + "/");
	}

	public getSongById(id: number): Observable<any> {
		return this.http.get(this.apiURL + 'song/' + id + "/");
	}

	public getMostPopularArtists(numberOfArtists: number) {
		return this.http.get(this.apiURL + 'user/?most_popular=' + numberOfArtists);
	}

	public getMostPopularAlbums(numberOfAlbum: number, artistId?: number) {
		let reqURL: string = this.apiURL + 'album/?most_popular=' + numberOfAlbum;
		if (artistId) {
			reqURL += "&artist_id=" + artistId;
		}
		return this.http.get(reqURL);
	}

	public getMostPopularSongs(numberOfSongs: number, artistId?: number) {
		let reqURL: string = this.apiURL + 'song/?most_popular=' + numberOfSongs;
		if (artistId) {
			reqURL += "&artist_id=" + artistId;
		}
		return this.http.get(reqURL);
	}
}