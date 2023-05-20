import { Component } from '@angular/core';
import { Album } from '../../models/album';
import { User } from '../../models/user';
@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent {
  artist!: User;
  artistAlbums!: Album[];

  constructor() { 
    this.artist = new User("Artist", "artist@gmail.com",new Date(), "description", "https://i.scdn.co/image/ab67618600001016884ff2782a08666bb6d187fe", "https://i.scdn.co/image/ab67618600001016884ff2782a08666bb6d187fe");
    
    this.artistAlbums = [
      new Album("Album 1", this.artist, 2021, "Description 1", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
      new Album("Album 2", this.artist, 2021, "Description 2", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
      new Album("Album 3", this.artist, 2021, "Description 3", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
      new Album("Album 4", this.artist, 2021, "Description 4", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
      new Album("Album 5", this.artist, 2021, "Description 5", "https://i.scdn.co/image/ab67616d00001e02c7d6fe09dfe4af1580e59705", 0),
    ];
  }

}
