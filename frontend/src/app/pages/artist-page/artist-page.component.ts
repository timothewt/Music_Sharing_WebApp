import { Component } from '@angular/core';
import { Album } from '../../models/album';
import { User } from '../../models/user';
import { Song } from '../../models/song';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent {
  
  //Main artist of the page
  artist!: User;

  //Albums of the artist
  artistAlbums!: Album[];

  //Songs of the artist
  artistSongs!: Song[];


  constructor() {}

}
