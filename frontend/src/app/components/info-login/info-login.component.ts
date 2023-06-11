import { Component, OnInit } from '@angular/core';
import { SharedAuthService } from 'src/app/services/shared-auth.service';

@Component({
	selector: 'app-info-login',
	templateUrl: './info-login.component.html',
	styleUrls: ['./info-login.component.scss']
})
export class InfoLoginComponent implements OnInit {

	constructor(public authService: SharedAuthService) { } 

	ngOnInit(): void {}
}
