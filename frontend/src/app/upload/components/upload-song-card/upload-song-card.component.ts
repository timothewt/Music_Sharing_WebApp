import { Component, Input, OnInit, Output } from '@angular/core';
import { Song } from 'src/app/models/song';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-song-card',
  templateUrl: './upload-song-card.component.html',
  styleUrls: ['./upload-song-card.component.scss']
})
export class UploadSongCardComponent implements OnInit{

  @Input() song !:Song;
  @Input() index !:number;

  @Output() deleteSongEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

  }

  deleteSong(): void {
    this.deleteSongEvent.emit(this.index);
  }

}
