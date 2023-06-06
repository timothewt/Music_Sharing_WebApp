import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from "./config";

@Injectable({
	providedIn: 'root'
})
export class SharedAuthService {


	private apiURL: string = "";
	private tokenURL: string = "";

	private refreshToken: string = "";
	private accessToken: string = "";
	public loggedIn: boolean = false;
	public currentUserID: number = 0;
	private refreshIntervalId: any;

	constructor(private http: HttpClient) {
		this.apiURL = config.apiURL;
		this.tokenURL = config.tokenURL;
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
				this.setTokens(response.refresh, response.access);
				this.refreshIntervalId = setInterval(() => this.refreshAccessToken(), 1000*60*5);

				let headers = { 'content-type': 'application/json', 'Authorization': "Bearer " + this.accessToken}
				let currUserHttpResponse = this.http.get(config.apiURL + 'user/current_user/', {'headers':headers});

				currUserHttpResponse.subscribe(
					(response: any) => {
						this.currentUserID = response.id;
					}
				);
			});
		return httpResponse;
	}

	public setTokens(refreshToken: string, accessToken: string) {
		this.refreshToken = refreshToken;
		this.accessToken = accessToken;
		this.loggedIn = true;
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
		this.currentUserID = 0;
	}
}
