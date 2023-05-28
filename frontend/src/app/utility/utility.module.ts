import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongComponent } from './components/song/song.component';
import { AlbumComponent } from './components/album/album.component';
import { TimePipe } from './timePipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SongComponent,
    AlbumComponent,
    TimePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SongComponent,
    AlbumComponent,
    TimePipe,
  ]
})
export class UtilityModule { }
