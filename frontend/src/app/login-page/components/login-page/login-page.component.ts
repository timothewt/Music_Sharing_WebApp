import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedAuthService } from 'src/app/services/shared-auth.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

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
	
	constructor(private authService: SharedAuthService, private formBuilder: FormBuilder, private router:Router, private apiService: APIService) { }

	ngOnInit(): void {
		this.action = "login";
		if (this.authService.loggedIn) {
			this.router.navigate(['/artist', 1]);
		}
	}

	changeAction(action: "login" | "register") {
		this.action = action;
		console.log(this.action);
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
				// Redirect to the artist's page using its id
				// Search by username (to change to exact match disallowing partial matches) 
				// should work for now
				this.apiService.getUsers({searchedValue:username}).subscribe(
					(response: any) => {
						this.router.navigate(['/artist', response[0].id]);
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


