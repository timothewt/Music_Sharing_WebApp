import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-song-page',
  templateUrl: './song-page.component.html',
  styleUrls: ['./song-page.component.scss']
})
export class SongPageComponent {
  @Input() song!: Song;

  constructor() { }

}
