import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { UtilityModule } from '../utility/utility.module';
import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    UtilityModule,
    SearchPageRoutingModule,
    FormsModule,
  ],
  exports: [
    SearchPageComponent,
  ]
})
export class SearchPageModule { }
