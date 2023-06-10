import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { SharedAuthService } from 'src/app/services/shared-auth.service';

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
    albumTitle: '',
  });

  coverFile: File = new File([], "")

  constructor(private formBuilder: FormBuilder, private apiService: APIService, private authService: SharedAuthService) { }

  ngOnInit(): void {

  }

  addSongToUploadList(song: Song): void {
    this.uploadList.push(song);
    console.log(this.uploadList);
  }

  deleteSongAtPos(index:number): void {
    this.uploadList.splice(index, 1);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverFile = file;
    }
  }


  upload(): void{
    //Get the album title from the form group input text
    const albumTitle: string = this.uploadForm.get('albumTitle')?.value;

    this.apiService.postNewAlbum(albumTitle, this.authService.getAccessToken(), "", "2000", this.coverFile).subscribe((response) => {
      console.log(response);
    });

  }

  


}
