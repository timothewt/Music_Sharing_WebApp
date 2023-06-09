import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})


export class UploadPageComponent {

  genres: string[] = ['Rock', 'Pop', 'Jazz', 'Hip Hop', 'Electronic'];
  selectedGenres: string[] = [];

  uploadList: Song[] = [];

  uploadForm: FormGroup = this.formBuilder.group({
    albumCover : '',
    albumTitle: '',
  });

  constructor(private formBuilder: FormBuilder) { }

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
    //Get the album cover from the form group input file
    const albumCover: File = this.uploadForm.get('albumCover')?.value;

    //Get the album title from the form group input text
    const albumTitle: string = this.uploadForm.get('albumTitle')?.value;

  }

  


}
