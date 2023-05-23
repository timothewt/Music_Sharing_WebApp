import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { APIGetOptions } from '../models/apiget-options';

@Injectable()
export class APIService {

	apiURL: string = "http://127.0.0.1:8000/api/";

	constructor(private http: HttpClient) {}

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
}