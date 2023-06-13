import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadSong } from 'src/app/models/uploadSong';

@Component({
  selector: 'app-upload-song-card-generator',
  templateUrl: './upload-song-card-generator.component.html',
  styleUrls: ['./upload-song-card-generator.component.scss']
})
export class UploadSongCardGeneratorComponent implements OnInit {

  @Input() genres !: string[];
  @Output() songAddEvent = new EventEmitter<UploadSong>();

  generateForm: FormGroup = this.formBuilder.group({
    title: ''
  });

  currentSong: UploadSong = new UploadSong();
  currentSongGenres: string[] = [];

  recordingFile: File = new File([], "");

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  } 

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.recordingFile = file;
    }
  }

  updateGenres(genres: string[]): void {
    this.currentSongGenres = genres;
  }


  public addSong() : void {
    const title: string = this.generateForm.get('title')?.value;
    this.currentSong.name = title;
    let currentSongGenresCopy: string[] = this.currentSongGenres.slice();
    this.currentSong.genres = currentSongGenresCopy;
    this.currentSong.recordingFile = this.recordingFile;

    this.songAddEvent.emit(this.currentSong);

    //Reset the song
    this.currentSong = new UploadSong();

    
  }

}
