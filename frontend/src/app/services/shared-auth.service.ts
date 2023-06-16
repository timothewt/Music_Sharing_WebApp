import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
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
	public currentUserUsername: string = "";
	public refreshIntervalId: any;

	public loggedIn$ : Subject<boolean> = new Subject<boolean>();

	constructor(private http: HttpClient) {
		this.apiURL = config.apiURL;
		this.tokenURL = config.tokenURL;
	}

	public getAccessToken(): string {
		/**
		 * @return The access token for the backend
		 */
		return this.accessToken;
	}

	public fetchTokensPair(username: string, password: string): Observable<any> {
		/**
		 * Fetches the user's tokens pair from the backend using the user's username and password
		 * @param username The user's username
		 * @param password The user's password
		 * @return the http request as an observable
		 */
		let headers = { 'content-type': 'application/json'}  
		let body = {'username':username,'password':password};
		let httpResponse: Observable<Object> = this.http.post(this.tokenURL, body,{'headers':headers});
		return httpResponse;
	}

	public setTokens(refreshToken: string, accessToken: string): void {
		/**
		 * Sets the refresh token and the access token in the current object
		 * @param refreshToken The refresh token
		 * @param accessToken The access token
		 */
		this.refreshToken = refreshToken;
		this.accessToken = accessToken;
		this.loggedIn = true;
	}

	public refreshAccessToken(): void {
		/**
		 * Refreshes the access token using the refresh token because the access token needs to be refreshed every 15 minutes
		 */
		if (this.refreshToken === "") return;
		let headers = { 'content-type': 'application/json'}  
		let body = {'refresh':this.refreshToken};
		let httpResponse = this.http.post(this.tokenURL + 'refresh/', body,{'headers':headers});
		httpResponse.subscribe(
			(response: any) => {
				this.accessToken = response.access;
				this.loggedIn$.next(this.loggedIn);
			},
			(error: any) => {
				this.logout();
			}
		);
	}

	public logout(): void {
		/**
		 * Logs the user out by clearing the refresh token, the access token, the logged in status and the user id
		 * It also clears the interval that refreshes the access token
		 */
		clearInterval(this.refreshIntervalId);
		this.refreshToken = "";
		this.accessToken = "";
		this.loggedIn = false;
		this.currentUserID = 0;
		this.loggedIn$.next(this.loggedIn);
	}

	public register(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
		/**
		 * Registers the user using the user's username, email and password
		 * @param username The user's username
		 * @param email The user's email
		 * @param password The user's password
		 * @param confirmPassword The user's password confirmation
		 * @return the http request as an observable
		 */
		let headers = { 'content-type': 'application/json'}  
		let body = {'username':username,'email':email,'password':password,'confirm_password':confirmPassword};
		let httpResponse = this.http.post(this.apiURL + 'user/register/', body,{'headers':headers});
		return httpResponse;
	}
}
