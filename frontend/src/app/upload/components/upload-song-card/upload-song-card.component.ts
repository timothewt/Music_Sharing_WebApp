import { Component, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UploadSong } from 'src/app/models/uploadSong';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'app-upload-song-card',
	templateUrl: './upload-song-card.component.html',
	styleUrls: ['./upload-song-card.component.scss']
})
export class UploadSongCardComponent implements OnInit{

	@Input() song !:UploadSong;
	@Input() index !:number;

	songUrl: SafeUrl = "";

	@Output() deleteSongEvent = new EventEmitter<number>();

	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit(): void {
		const audioBlob = new Blob([this.song.recordingFile], { type: 'audio/mpeg' });
		this.songUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(audioBlob));

		// gets the duration of the audio
		let audio = new Audio(URL.createObjectURL(audioBlob));

		audio.addEventListener('loadedmetadata', () => {
			this.song.duration = Math.round(audio.duration * 1000);
		});
	}

	deleteSong(): void {
		/*
		* Emits the deleteSongEvent
		* @param {void}
		* @return {void}
		*/
		this.deleteSongEvent.emit(this.index);
	}

}
