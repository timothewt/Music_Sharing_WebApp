import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class APIService {

	apiURL: string = "http://127.0.0.1:8000/api/";

	constructor(private http: HttpClient) {}

	public getArtistById(id: number): Observable<any> {
		return this.http.get(this.apiURL + 'user/' + id + "/");
	}
}