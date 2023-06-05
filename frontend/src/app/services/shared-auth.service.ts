import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SharedAuthService {

	private tokenURL: string = "http://127.0.0.1:8000/api/token/";

	private refreshToken: string = "";
	private accessToken: string = "";
	public loggedIn: boolean = false;
	private currentUsername: string = "";
	private refreshIntervalId: any;

	constructor(private http: HttpClient) {

	}

	public getRefreshToken(): string {
		return this.refreshToken;
	}

	public getAccessToken(): string {
		return this.accessToken;
	}

	public fetchTokensPair(username: string, password: string): Observable<Object> {
		let headers = { 'content-type': 'application/json'}  
		let body = {'username':username,'password':password};
		let httpResponse: Observable<Object> = this.http.post(this.tokenURL, body,{'headers':headers});
		httpResponse.subscribe(
			(response: any) => {
				this.setTokens(response.refresh, response.access, username);
				this.refreshIntervalId = setInterval(() => this.refreshAccessToken(), 1000*60*5);
			}
		);
		return httpResponse;
	}

	public setTokens(refreshToken: string, accessToken: string, username: string) {
		this.refreshToken = refreshToken;
		this.accessToken = accessToken;
		this.loggedIn = true;
		this.currentUsername = username;
	}

	private refreshAccessToken() {
		if (this.refreshToken === "") return;
		let headers = { 'content-type': 'application/json'}  
		let body = {'refresh':this.refreshToken};
		let httpResponse = this.http.post(this.tokenURL + 'refresh/', body,{'headers':headers});
		httpResponse.subscribe(
			(response: any) => {
				this.accessToken = response.access;
			},
			(error: any) => {
				this.logout();
			}
		);
	}

	public logout() {
		clearInterval(this.refreshIntervalId);
		this.refreshToken = "";
		this.accessToken = "";
		this.loggedIn = false;
		this.currentUsername = "";
	}
}
