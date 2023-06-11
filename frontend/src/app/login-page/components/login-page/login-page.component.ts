import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedAuthService } from 'src/app/services/shared-auth.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { config } from 'src/app/services/config';
import { SharedPopUpService } from 'src/app/services/shared-pop-up.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

	action: "login" | "register" = "login";

	isButtonLoginActive: boolean = true;

	loginForm: FormGroup = this.formBuilder.group({
		username: '',
		email: new FormControl('',[
			Validators.required,
			Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
		password: '',
		confirmPassword: '',
	});
	
	constructor(private authService: SharedAuthService, private formBuilder: FormBuilder, private router:Router, private apiService: APIService	, private http: HttpClient, private sharedPopUpService: SharedPopUpService) { }

	ngOnInit(): void {
		this.action = "login";
		if (this.authService.loggedIn) {
			this.router.navigate(['/artist', this.authService.currentUserID]);
		}
	}

	changeAction(action: "login" | "register") {
		this.action = action;
	}

	login(){
		// Check if the button is active
		if (this.isButtonLoginActive == false) return;
	
		// Get the username and password from the form
		const username: string = this.loginForm.get('username')?.value;
		const email: string = this.loginForm.get('email')?.value;
		const password: string = this.loginForm.get('password')?.value;
		const confirmPassword: string = this.loginForm.get('confirmPassword')?.value;


		if (this.action == "login") {
			this.loginUser(username, password);
		}
		else if (this.action == "register") {
			this.registerUser(username, email, password, confirmPassword);
		}
	}

	loginUser(username: string, password: string): void {
		this.isButtonLoginActive = false;
		this.authService.fetchTokensPair(username, password).subscribe(
			(response: any) => {
				this.authService.setTokens(response.refresh, response.access);
				this.authService.refreshIntervalId = setInterval(() => this.authService.refreshAccessToken(), 1000*60*5);

				let headers = { 'content-type': 'application/json', 'Authorization': "Bearer " + response.access}
				let currUserHttpResponse = this.http.get(config.apiURL + 'user/current_user/', {'headers':headers});

				currUserHttpResponse.subscribe(
					(response: any) => {
						this.authService.currentUserID = response.id;
						this.router.navigate(['/artist', response.id]);
					}
				);
				this.isButtonLoginActive = true;
			},
			(error: any) => {
				this.sharedPopUpService.showPopUp({message:"Login failed", color:"red"});
				this.isButtonLoginActive = true;
			}
		);
	}

	registerUser(username: string, email: string, password: string, confirmPassword: string): void {
		this.isButtonLoginActive = false;
		if (password !== confirmPassword) {
			console.error('Passwords do not match');
			return;
		}

		this.authService.register(username, email, password, confirmPassword).subscribe(
			(response: any) => {
				this.loginUser(username, password);
				this.isButtonLoginActive = true;
			},
			(error: any) => {
				this.sharedPopUpService.showPopUp({message:"Registration failed :" + error.error.error, timedisplay: 3000});
				this.isButtonLoginActive = true;
			}
		);

	}
}


