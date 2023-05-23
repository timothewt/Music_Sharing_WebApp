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

	public getUsers(limit: number, mostPopular: boolean = true, searched_value?: string, offset?: number) {
		let reqUrl: string = this.apiURL + 'user/?limit=' + limit;
		if (mostPopular) {
			reqURL += "&most_popular";
		}
		if (searched_value) {
			reqURL += '&search=' + searched_value;
		}
		if (offset) {
			reqURL += "&offset=" + offset;
		}
		return this.http.get(reqURL);
	}

	public getAlbums(limit: number, mostPopular: boolean = true, searched_value?: string, offset?: number, artistId?: number) {
		let reqURL: string = this.apiURL + 'album/?limit=' + limit;
		if (mostPopular) {
			reqURL += "&most_popular";
		}
		if (searched_value) {
			reqURL += '&search=' + searched_value;
		}
		if (offset) {
			reqURL += "&offset=" + offset;
		}
		if (artistId) {
			reqURL += "&artist_id=" + artistId;
		}
		return this.http.get(reqURL);
	}

	public getSongs(limit: number, mostPopular: boolean = true, searched_value?: string, offset?: number, artistId?: number, albumId?: number) {
		let reqURL: string = this.apiURL + 'song/?most_popular&limit=' + limit;
		if (mostPopular) {
			reqURL += "&most_popular";
		}
		if (searched_value) {
			reqURL += '&search=' + searched_value;
		}
		if (offset) {
			reqURL += "&offset=" + offset;
		}
		if (artistId) {
			reqURL += "&artist_id=" + artistId;
		}
		if (albumId) {
			reqURL += "&album_id=" + artistId;
		}
		return this.http.get(reqURL);
	}
}