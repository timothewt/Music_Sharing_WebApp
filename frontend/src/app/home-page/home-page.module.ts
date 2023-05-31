import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { UtilityModule } from 'src/app/utility/utility.module';
import { HomePageRoutingModule } from './home-page-routing.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilityModule,
    HomePageRoutingModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
