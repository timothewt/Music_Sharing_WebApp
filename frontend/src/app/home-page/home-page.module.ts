import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { UtilityModule } from 'src/app/utility/utility.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilityModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
