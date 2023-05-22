import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {
  //Main song of the component
  @Input() song!: Song;

  @Input() index!: number;
  constructor() { 
  }
}
