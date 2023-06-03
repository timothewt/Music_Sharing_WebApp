import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { UtilityModule } from 'src/app/utility/utility.module';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilityModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginPageComponent
  ]
})

export class LoginPageModule { }
