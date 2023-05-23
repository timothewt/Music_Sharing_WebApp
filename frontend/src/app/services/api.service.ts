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

	public getMostPopularArtists(limit: number) {
		return this.http.get(this.apiURL + 'user/?most_popular&limit=' + limit);
	}

	public getMostPopularAlbums(limit: number, offset?: number, artistId?: number) {
		let reqURL: string = this.apiURL + 'album/?most_popular&limit=' + limit;
		if (offset) {
			reqURL += "&offset=" + offset;
		}
		if (artistId) {
			reqURL += "&artist_id=" + artistId;
		}
		return this.http.get(reqURL);
	}

	public getMostPopularSongs(limit: number, offset?: number, artistId?: number) {
		let reqURL: string = this.apiURL + 'song/?most_popular&limit=' + limit;
		if (offset) {
			reqURL += "&offset=" + offset;
		}
		if (artistId) {
			reqURL += "&artist_id=" + artistId;
		}
		return this.http.get(reqURL);
	}

	public getArtistsBySearch(searched_value: string, limit: number, offset?: number) {
		let reqURL: string = this.apiURL + 'user/?most_popular&search=' + searched_value + '&limit=' + limit;
		if (offset) {
			reqURL += "&offset=" + offset;
		}
		return this.http.get(reqURL);
	}

	public getAlbumsBySearch(searched_value: string, limit: number, offset?: number) {
		let reqURL: string = this.apiURL + 'album/?most_popular&search=' + searched_value + '&limit=' + limit;
		if (offset) {
			reqURL += "&offset=" + offset;
		}
		return this.http.get(reqURL);
	}

	public getSongsBySearch(searched_value: string, limit: number, offset?: number) {
		let reqURL: string = this.apiURL + 'song/?most_popular&search=' + searched_value + '&limit=' + limit;
		if (offset) {
			reqURL += "&offset=" + offset;
		}
		return this.http.get(reqURL);
	}
}