import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Album } from '../../models/album';
import { Song } from '../../models/song';
import { Queue } from '../../models/queue';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss']
})

export class PlayerComponent {
	@Input() queue: Queue;
	audio: any;
	songLength: number;
	songLengthAsStr: string;
	currentTime: number;
	currentTimeAsStr: string;
	currentTimeElement: any;
	currentlyPlaying: boolean;
	volumeBeforeDisabled: number;
	volumeDisabled: boolean;
	loopType: number; // 0: no loop, 1: loop the playlist, 2: loop the song
	visibleQueue: boolean;

	constructor() {
		this.queue = new Queue();
		this.audio = new Audio();
		this.currentTime = 0;
		this.currentTimeAsStr = "0:00";
		this.songLength = 0;
		this.songLengthAsStr = "0:00";
		this.currentlyPlaying = false;
		this.audio.volume = .5
		this.volumeBeforeDisabled = this.audio.volume;
		this.volumeDisabled = false;
		this.loopType = 0;
		this.visibleQueue = false;
	}

	ngOnInit(): void {
		this.loadCurrentSong(false);

		this.audio.addEventListener('timeupdate', () => { // when the time of the audio changes
			this.onAudioTimeUpdate()
		});
	}
	
	public loadCurrentSong(playAudio: boolean = false): void {
		if (this.queue.songs.length == 0) return;
		this.audio.src = this.queue.songs[this.queue.currentSongIndex].recordingLink;
		this.currentTime = 0;
		this.currentTimeAsStr = "0:00";

		this.audio.addEventListener('loadedmetadata', () => {  // fetches the length of the song when it has been loaded
			this.songLength = this.audio.duration;
			this.songLengthAsStr = this.timeToTimeAsStr(this.songLength);				
		});

		if (playAudio) {
			this.resumeAudio();
		} else {
			this.pauseAudio();
		}
	}

	private onAudioTimeUpdate(): void {
		this.currentTime = this.audio.currentTime;
		this.currentTimeAsStr = this.timeToTimeAsStr(this.currentTime);

		if (this.currentTime == this.songLength) {
			if (this.loopType == 2) {
				this.restartSong();
				return;
			}
			if (this.queue.songs.length - 1 == this.queue.currentSongIndex) {
				this.queue.currentSongIndex = 0;
				this.loadCurrentSong(this.loopType == 1);
			} else {
				this.nextSong();
			}
		}
	}

	private timeToTimeAsStr(timeInSeconds: number): string {
		let seconds: number | string = Math.floor(timeInSeconds % 60);
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		let minutes: number | string = Math.floor(timeInSeconds / 60);
		return minutes + ":" + seconds;
	}

	public resumeAudio(): void {
		this.currentlyPlaying = true;
		this.audio.play();	
	}

	public pauseAudio(): void {
		this.currentlyPlaying = false;
		this.audio.pause();
	}

	private restartSong(): void {
		this.audio.currentTime = 0;
		this.resumeAudio();
	}

	public previousSong(): void {
		if (this.currentTime >= 1 || this.loopType == 2) {
			this.audio.currentTime = 0;
			return;
		}
		if (this.queue.currentSongIndex == 0) {
			if (this.loopType == 0) return;
			this.queue.currentSongIndex = this.queue.songs.length;
		}
		this.queue.currentSongIndex -= 1;
		this.loadCurrentSong(this.currentlyPlaying);
	}

	public nextSong(): void {
		if (this.loopType == 2) {
			this.restartSong();
			return;
		}
		if (this.queue.songs.length - 1 == this.queue.currentSongIndex) {
			if (this.loopType == 0) {
				this.audio.currentTime = this.songLength;
				return;
			}
			this.queue.currentSongIndex = -1;
		};
		this.queue.currentSongIndex += 1;
		this.loadCurrentSong(this.currentlyPlaying);
	}

	public changeCurrentTime(input: any): void {
		this.audio.currentTime = input.value * this.songLength;
	}

	public changeVolume(input: any): void {
		this.audio.volume = input.value;
	}

	public toggleVolume(): void {
		if (this.volumeDisabled) {
			this.audio.volume = this.volumeBeforeDisabled;
		} else {
			this.volumeBeforeDisabled = this.audio.volume;
			this.audio.volume = 0;
		}
		this.volumeDisabled = !this.volumeDisabled;
	}

	public nextLoopType(): void {
		this.loopType = (this.loopType + 1) % 3;
	}

	public toggleQueueVisibility(): void {
		this.visibleQueue = !this.visibleQueue;
	}
}
