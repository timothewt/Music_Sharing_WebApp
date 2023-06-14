import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedPopUpService } from 'src/app/services/shared-pop-up.service';
import { UploadSong } from 'src/app/models/uploadSong';

@Component({
	selector: 'app-upload-song-card-generator',
	templateUrl: './upload-song-card-generator.component.html',
	styleUrls: ['./upload-song-card-generator.component.scss']
})
export class UploadSongCardGeneratorComponent implements OnInit {

	@Input() tags !: string[];
	@Output() songAddEvent = new EventEmitter<UploadSong>();

	generateForm: FormGroup = this.formBuilder.group({
		title: ['', Validators.required],
	});

	currentSong: UploadSong = new UploadSong();
	currentSongTags: string[] = [];

	recordingFile: File = new File([], "");

	uploadedSong: boolean = false;

	constructor(private formBuilder: FormBuilder, private sharedPopUpService: SharedPopUpService) { }

	ngOnInit(): void {

	} 

	onFileSelected(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			// checking if it's an audio file
			if (file.type != "audio/mpeg"){
				this.sharedPopUpService.showPopUp({message:"Please only import audio files", timedisplay:3000, color:"red"});
			} else {
				this.recordingFile = file;
				this.uploadedSong = true;
			}
		}
	}

	updateGenres(tags: string[]): void {
		this.currentSongTags = tags;
	}


	public addSong() : void {
		const title: string = this.generateForm.get('title')?.value;

		if (title == "" || !this.uploadedSong) return;

		this.currentSong.name = title;
		let currentSongTagsCopy: string[] = this.currentSongTags.slice();
		this.currentSong.tags = currentSongTagsCopy;
		this.currentSong.recordingFile = this.recordingFile;

		this.songAddEvent.emit(this.currentSong);

		//Reset the song
		this.currentSong = new UploadSong();
	}

}
