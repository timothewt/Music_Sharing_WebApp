import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongPageComponent } from './components/song-page/song-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SongPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SongPageComponent
  ]
})
export class SongPageModule { }
