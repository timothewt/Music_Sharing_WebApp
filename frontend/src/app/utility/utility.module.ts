import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongComponent } from './components/song/song.component';
import { AlbumComponent } from './components/album/album.component';
import { TimePipe } from './timePipe';
import { RouterModule } from '@angular/router';
import { ArtistComponent } from './components/artist/artist.component';

@NgModule({
  declarations: [
    SongComponent,
    AlbumComponent,
    TimePipe,
    ArtistComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SongComponent,
    AlbumComponent,
    ArtistComponent,
    TimePipe,
  ]
})
export class UtilityModule { }
