import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { SharedAuthService } from 'src/app/services/shared-auth.service';

@Component({
  selector: 'app-info-login',
  templateUrl: './info-login.component.html',
  styleUrls: ['./info-login.component.scss']
})
export class InfoLoginComponent implements OnInit {

  public isLogged: boolean = this.authService.currentUserID != 0;
  public username: string = "";
  public idUser: number = this.authService.currentUserID;

  constructor(public authService: SharedAuthService) { } 

  ngOnInit(): void {
  }

}
