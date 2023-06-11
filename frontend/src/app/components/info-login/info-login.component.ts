import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { SharedAuthService } from 'src/app/services/shared-auth.service';

@Component({
  selector: 'app-info-login',
  templateUrl: './info-login.component.html',
  styleUrls: ['./info-login.component.scss']
})
export class InfoLoginComponent implements OnInit {

  public isLogged: boolean = this.sharedAuthService.currentUserID != 0;
  public username: string = "";
  public idUser: number = this.sharedAuthService.currentUserID;

  constructor(private sharedAuthService: SharedAuthService, private apiService: APIService) { } 

  ngOnInit(): void {
    this.sharedAuthService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.switchLoginState(loggedIn);
      }
    );

    this.switchLoginState(this.isLogged);
  }

  public switchLoginState(loggedIn: boolean){
    this.isLogged = loggedIn;

    if (loggedIn) {
      this.searchUserLoggedIn();
    }
  }

  public searchUserLoggedIn(): void {
    this.idUser = this.sharedAuthService.currentUserID;
    this.apiService.getUserById(this.sharedAuthService.currentUserID).subscribe(
      (response: any) => {
        this.username = response.username;
      }
    );
  }
}
