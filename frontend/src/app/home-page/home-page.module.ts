import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { UtilityModule } from '../utility/utility.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilityModule,
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
