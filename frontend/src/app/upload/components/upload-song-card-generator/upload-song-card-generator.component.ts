import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Song } from 'src/app/models/song';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload-song-card-generator',
  templateUrl: './upload-song-card-generator.component.html',
  styleUrls: ['./upload-song-card-generator.component.scss']
})
export class UploadSongCardGeneratorComponent implements OnInit {

  @Input() genres !: string[];
  @Output() songAddEvent = new EventEmitter<Song>();

  generateForm: FormGroup = this.formBuilder.group({
    title: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  } 

  public addSong() : void {
    const title: string = this.generateForm.get('title')?.value;
    
    let song: Song = new Song(); 
    song.name = title;
    this.songAddEvent.emit(song);
  }

}
