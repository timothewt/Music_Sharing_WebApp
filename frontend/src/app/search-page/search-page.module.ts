import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { UtilityModule } from '../utility/utility.module';



@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    UtilityModule,
  ],
  exports: [
    SearchPageComponent
  ]
})
export class SearchPageModule { }
