import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
		albumTitle: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(100)]
			),
		albumReleaseYear: new FormControl('',[ 
			Validators.required,
			Validators.pattern("^[0-9]*$")]),
		albumDescription: new FormControl('',[
			Validators.minLength(3),
			Validators.maxLength(1000)
		]),
	});

	coverFile: File = new File([], "")

	constructor(private formBuilder: FormBuilder, private router:Router, private apiService: APIService, private authService: SharedAuthService, private sharedPopUpService: SharedPopUpService) { }

	ngOnInit(): void {

		if (!this.authService.loggedIn) {
			this.router.navigate(['/login']);
		}

		this.apiService.getTags().subscribe(
			(response: any) => {
				response.forEach((tag: any) => {
					this.tags.push(tag.name);
				});
			}
		);
	}

	addSongToUploadList(song: UploadSong): void {
		/*
		* Add the song to the upload list
		* @param {UploadSong} song - The song to be added to the upload list
		* @return {void}
		*/
		this.uploadList.push(song);
	}

	deleteSongAtPos(index:number): void {
		/*
		* Delete the song at the given index from the upload list
		* @param {number} index - The index of the song to be deleted
		* @return {void}
		*/
		this.uploadList.splice(index, 1);
	}

	onFileSelected(event: any): void {
		/*
		* Set the image preview source to the selected file
		* @param {any} event - The event that triggered the function
		* @return {void}
		*/

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


	upload(): void {
		/*
		* Upload the album and the songs to the server
		* @param {void}
		* @return {void}
		*/
		//Get the album title from the form group input text
		const albumTitle: string = this.uploadForm.get('albumTitle')?.value;
		const albumReleaseYear: number = this.uploadForm.get('albumReleaseYear')?.value;
		const albumDescription: string = this.uploadForm.get('albumDescription')?.value;

		if (this.uploadForm.get('albumTitle')?.invalid) {
			this.sharedPopUpService.showPopUp({message:"Album title is invalid", timedisplay:3000, color:"red"});
			return;
		}

		if (this.uploadForm.get('albumReleaseYear')?.invalid) {
			this.sharedPopUpService.showPopUp({message:"Album release year is invalid", timedisplay:3000, color:"red"});
			return;
		}

		if (this.uploadForm.get('albumDescription')?.invalid) {
			this.sharedPopUpService.showPopUp({message:"Album description is invalid", timedisplay:3000, color:"red"});
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
		albumUpload.description = albumDescription;
		albumUpload.releaseYear = albumReleaseYear;

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
