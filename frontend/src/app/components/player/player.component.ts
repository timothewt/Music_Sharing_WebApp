import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Album } from '../../models/album';
import { Song } from '../../models/song';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss']
})

export class PlayerComponent {
	@Input() currentSong: Song | undefined;
	audio = new Audio();
	songLength: number;
	songLengthAsStr: string;
	currentTime: number;
	currentTimeAsStr: string;
	currentTimeElement: any;
	currentlyPlaying: boolean = false;

	constructor() {
		this.currentSong = undefined;
		this.currentTime = 0;
		this.currentTimeAsStr = "0:00";
		this.songLength = 0;
		this.songLengthAsStr = "0:00";
	}

	ngOnInit(){
		if (this.currentSong != undefined) {
			this.audio.src = this.currentSong.recordingLink;

			this.audio.addEventListener('loadedmetadata', () => {  // fetches the length of the song when it has been loaded
				this.songLength = this.audio.duration;
				this.songLengthAsStr = this.timeToTimeAsStr(this.songLength);				
			});

			this.audio.addEventListener('timeupdate', () => { // when the time
				this.currentTime = this.audio.currentTime;
				this.currentTimeAsStr = this.timeToTimeAsStr(this.currentTime);
			});

		}
	}

	private timeToTimeAsStr(timeInSeconds: number): string {
		let seconds: number | string = Math.ceil(timeInSeconds % 60);
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		let minutes: number | string = Math.floor(timeInSeconds / 60);
		return minutes + ":" + seconds;
	}

	public resumeAudio() {
		this.currentlyPlaying = true;
		this.audio.play();	
	}

	public pauseAudio() {
		this.currentlyPlaying = false;
		this.audio.pause();
	}

	public changeCurrentTime(input: any) {
		this.audio.currentTime = input.value * this.songLength;
	}

	public changeVolume(input: any) {
		this.audio.volume = input.value;
	}
}
