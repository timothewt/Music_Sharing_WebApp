import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { RouterModule } from '@angular/router';
import { UtilityModule } from '../utility/utility.module';

@NgModule({
  declarations: [
    AlbumPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilityModule
  ],
  exports: [
    AlbumPageComponent
  ]
})
export class AlbumPageModule { }
