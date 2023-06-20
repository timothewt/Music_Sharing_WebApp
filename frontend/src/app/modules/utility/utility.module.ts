import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongComponent } from './components/song/song.component';
import { AlbumComponent } from './components/album/album.component';
import { TimePipe } from './timePipe';
import { RouterModule } from '@angular/router';
import { ArtistComponent } from './components/artist/artist.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { DeletePopUpComponent } from './components/delete-pop-up/delete-pop-up.component';

@NgModule({
  declarations: [
    SongComponent,
    AlbumComponent,
    TimePipe,
    ArtistComponent,
    ContextMenuComponent,
    PopUpComponent,
    DeletePopUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    DeletePopUpComponent,
    SongComponent,
    AlbumComponent,
    ArtistComponent,
    TimePipe,
    ContextMenuComponent,
    PopUpComponent,
  ]
})
export class UtilityModule { }
