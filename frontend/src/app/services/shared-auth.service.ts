import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SharedAuthService {

	private tokenURL: string = "http://127.0.0.1:8000/api/token/";

	private refreshToken: string = "";
	private accessToken: string = "";
	private refreshIntervalId: any;

	constructor(private http: HttpClient) {

	}

	public getRefreshToken(): string {
		return this.refreshToken;
	}

	public getAccessToken(): string {
		return this.accessToken;
	}

	public fetchTokensPair(username: string, password: string):void {
	    let headers = { 'content-type': 'application/json'}  
	    let body = {'username':username,'password':password};
	    let httpResponse = this.http.post(this.tokenURL, body,{'headers':headers});
	    httpResponse.subscribe(
			(response: any) => {
				this.refreshToken = response.refresh;
				this.accessToken = response.access;

				this.refreshIntervalId = setInterval(() => {
					this.refreshAccessToken();
				}, 1000 * 60 * 14); // refreshes the access token every 14 minutes
			}
		);
	}

	private refreshAccessToken() {
		if (this.refreshToken === "") return;
	    let headers = { 'content-type': 'application/json'}  
	    let body = {'refresh':this.refreshToken};
	    let httpResponse = this.http.post(this.tokenURL + 'refresh/', body,{'headers':headers});
	    httpResponse.subscribe(
			(response: any) => {
				this.accessToken = response.access;
			}
		);
	}

	public logout() {
		clearInterval(this.refreshIntervalId);
		this.refreshToken = "";
		this.accessToken = "";
	}
}
