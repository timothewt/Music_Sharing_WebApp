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
	public refreshIntervalId: any;

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
		return httpResponse;
	}

	public setTokens(refreshToken: string, accessToken: string) {
		this.refreshToken = refreshToken;
		this.accessToken = accessToken;
		console.log("oui");
		this.loggedIn = true;
	}

	public refreshAccessToken() {
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

	public register(username: string, email: string, password: string, confirmPassword: string) {
		let headers = { 'content-type': 'application/json'}  
		let body = {'username':username,'email':email,'password':password,'confirm_password':confirmPassword};
		let httpResponse = this.http.post(this.apiURL + 'user/register/', body,{'headers':headers});
		return httpResponse;
	}
}
