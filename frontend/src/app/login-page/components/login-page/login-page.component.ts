import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedAuthService } from 'src/app/services/shared-auth.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { config } from 'src/app/services/config';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

	action: "login" | "register" = "login";

	loginForm: FormGroup = this.formBuilder.group({
		username: '',
		password: ''
	});
	
	constructor(private authService: SharedAuthService, private formBuilder: FormBuilder, private router:Router, private apiService: APIService	, private http: HttpClient) { }

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
		// Check if the form is valid
		if (this.loginForm.invalid) return;

		// Get the username and password from the form
		const username: string = this.loginForm.get('username')?.value;
		const password: string = this.loginForm.get('password')?.value;
		const confirmPassword: string = this.loginForm.get('confirmPassword')?.value;

		if (this.action == "login") {
			this.loginUser(username, password);
		}
		else if (this.action == "register") {
			this.registerUser(username, password, confirmPassword);
		}
	}

	loginUser(username:string, password:string): void {
		this.authService.fetchTokensPair(username, password).subscribe(
			(response: any) => {
				let headers = { 'content-type': 'application/json', 'Authorization': "Bearer " + response.access}
				let currUserHttpResponse = this.http.get(config.apiURL + 'current_user/', {'headers':headers});

				currUserHttpResponse.subscribe(
					(response: any) => {
						this.router.navigate(['/artist', response.id]);
					}
				);
			},
			(error: any) => {
				console.error('Login failed:', error);
			}
		);
	}

	registerUser(username:string, password:string, confirmPassword:string): void {
		if (password != confirmPassword) {
			console.error('Passwords do not match');
			return;
		}

		// Register the user
	}
}


