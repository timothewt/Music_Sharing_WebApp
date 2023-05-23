import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIGetOptions } from '../models/apiget-options';

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

	public getUsers(options: APIGetOptions) {
		let reqURL: string = this.apiURL + 'user/?limit=' + options.limit;
		if (options.mostPopular) {
			reqURL += "&most_popular";
		}
		if (options.searchedValue) {
			reqURL += '&search=' + options.searchedValue;
		}
		if (options.offset) {
			reqURL += "&offset=" + options.offset;
		}
		return this.http.get(reqURL);
	}

	public getAlbums(options: APIGetOptions) {
		let reqURL: string = this.apiURL + 'album/?limit=' + options.limit;
		if (options.mostPopular) {
			reqURL += "&most_popular";
		}
		if (options.searchedValue) {
			reqURL += '&search=' + options.searchedValue;
		}
		if (options.offset) {
			reqURL += "&offset=" + options.offset;
		}
		if (options.artistId) {
			reqURL += "&artist_id=" + options.artistId;
		}
		return this.http.get(reqURL);
	}

	public getSongs(options: APIGetOptions) {
		let reqURL: string = this.apiURL + 'song/?most_popular&limit=' + options.limit;
		if (options.mostPopular) {
			reqURL += "&most_popular";
		}
		if (options.searchedValue) {
			reqURL += '&search=' + options.searchedValue;
		}
		if (options.offset) {
			reqURL += "&offset=" + options.offset;
		}
		if (options.artistId) {
			reqURL += "&artist_id=" + options.artistId;
		}
		if (options.albumId) {
			reqURL += "&album_id=" + options.artistId;
		}
		return this.http.get(reqURL);
	}
}