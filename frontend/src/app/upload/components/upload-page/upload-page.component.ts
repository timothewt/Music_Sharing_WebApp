import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { SharedAuthService } from 'src/app/services/shared-auth.service';
import { Router } from '@angular/router';
import { UploadSong } from 'src/app/models/uploadSong';
import { SharedPopUpService } from 'src/app/services/shared-pop-up.service';
import { UploadAlbum } from 'src/app/models/uploadAlbum';

@Component({
	selector: 'app-upload-page',
	templateUrl: './upload-page.component.html',
	styleUrls: ['./upload-page.component.scss']
})


export class UploadPageComponent {

	tags: string[] = [];
	selectedGenres: string[] = [];

	uploadList: UploadSong[] = [];

	imagePreviewSrc: string = "../../../assets/image-placeholder.png";

	uploadForm: FormGroup = this.formBuilder.group({
		albumTitle: ['', Validators.required],
		description: '',
	});

	coverFile: File = new File([], "")

	constructor(private formBuilder: FormBuilder, private router:Router, private apiService: APIService, private authService: SharedAuthService, private sharedPopUpService: SharedPopUpService) { }

	ngOnInit(): void {
		this.apiService.getTags().subscribe(
			(response: any) => {
				response.forEach((tag: any) => {
					this.tags.push(tag.name);
				});
			}
		);
	}

	addSongToUploadList(song: UploadSong): void {
		this.uploadList.push(song);
	}

	deleteSongAtPos(index:number): void {
		this.uploadList.splice(index, 1);
	}

	onFileSelected(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.coverFile = file;

			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (_event) => {
				this.imagePreviewSrc = reader.result as string;
			}
		}
	}


	upload(): void{
		//Get the album title from the form group input text
		const albumTitle: string = this.uploadForm.get('albumTitle')?.value;

		if (albumTitle == "") {
			this.sharedPopUpService.showPopUp({message:"Album title is required", timedisplay:3000, color:"red"});
			return;
		}

		if (this.uploadList.length == 0) {
			this.sharedPopUpService.showPopUp({message:"You must upload at least one song", timedisplay:3000, color:"red"});
			return;
		}

		//Create the album upload 
		const albumUpload: UploadAlbum = new UploadAlbum();
		albumUpload.name = albumTitle;
		albumUpload.coverFile = this.coverFile;
		albumUpload.description = "";
		albumUpload.releaseYear = 2021;

		this.apiService.postNewAlbum(this.authService.getAccessToken(), albumUpload).subscribe(
			(response: any) => {
				//Upload the songs
				this.uploadList.forEach((song: UploadSong) => {
					console.log(song)
					song.album.id = response.id;
					this.apiService.postNewSong(this.authService.getAccessToken(), song).subscribe();
				});

				this.router.navigate(['/album', response.id]);

			},
			(error: any) => {
				this.sharedPopUpService.showPopUp({message:error['error'].error, timedisplay:3000, color:"red"});
			}
		);
	}

	


}
