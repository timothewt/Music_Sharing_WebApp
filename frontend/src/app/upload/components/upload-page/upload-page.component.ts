import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})


export class UploadPageComponent {

  genres: string[] = ['Rock', 'Pop', 'Jazz', 'Hip Hop', 'Electronic'];
  selectedGenres: string[] = [];

  uploadList: Song[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  addSongToUploadList(song: Song): void {
    this.uploadList.push(song);
    console.log(this.uploadList);
  }

  deleteSongAtPos(index:number): void {
    this.uploadList.splice(index, 1);
  }

  upload(): void{

  }

  


}
