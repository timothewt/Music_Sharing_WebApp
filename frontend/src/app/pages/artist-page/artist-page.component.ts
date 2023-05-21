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


  constructor() { 
    this.artist = new User(1, "Artist", "artist@gmail.com",new Date(), "description", "https://i.scdn.co/image/ab67618600001016884ff2782a08666bb6d187fe", "https://i.scdn.co/image/ab67618600001016884ff2782a08666bb6d187fe");
    
    this.artistAlbums = [
      new Album(1, "Album 1", this.artist, 2021, "Description 1", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
      new Album(2, "Album 2", this.artist, 2021, "Description 2", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
      new Album(3, "Album 3", this.artist, 2021, "Description 3", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
      new Album(4, "Album 4", this.artist, 2021, "Description 4", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
      new Album(5, "Album 5", this.artist, 2021, "Description 5", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
    ];

    this.artistSongs = [
      new Song(9287, "With Portfolio", this.artistAlbums[0], 1997, "https://p.scdn.co/mp3-preview/cb690e73c7653ac8d927f6b9801e5bf9470a471d?cid=774b29d4f13844c495f206cafdad9c86", "", 0),
      new Song(9287, "With Portfolio", this.artistAlbums[0], 1997, "https://p.scdn.co/mp3-preview/cb690e73c7653ac8d927f6b9801e5bf9470a471d?cid=774b29d4f13844c495f206cafdad9c86", "", 0),
      new Song(9287, "With Portfolio", this.artistAlbums[0], 1997, "https://p.scdn.co/mp3-preview/cb690e73c7653ac8d927f6b9801e5bf9470a471d?cid=774b29d4f13844c495f206cafdad9c86", "", 0)
    ]
  }

}
