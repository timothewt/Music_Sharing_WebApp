import { Component } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';
import { User } from './models/user';
import { Album } from './models/album';
import { Song } from './models/song';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  artist: User;
  album: Album;
  song: Song;

  constructor() {
    this.artist = new User("Mogwai", "", new Date(), "", "https://i.scdn.co/image/ab6761610000e5ebae7e4f81c7fe0747a61722ed", "");
    this.album = new Album("Young Team", this.artist, 1997, "", "https://i.scdn.co/image/ab67616d00001e029b6e9909a1ce872eac9501aa", 0);
    this.song = new Song("With Portfolio", this.album, 1997, "https://p.scdn.co/mp3-preview/cb690e73c7653ac8d927f6b9801e5bf9470a471d?cid=774b29d4f13844c495f206cafdad9c86", "", 0);
  }
}
