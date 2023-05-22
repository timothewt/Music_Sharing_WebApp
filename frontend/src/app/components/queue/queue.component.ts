import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Album } from '../../models/album';
import { Song } from '../../models/song';
import { Queue } from '../../models/queue';

@Component({
	selector: 'app-queue',
	templateUrl: './queue.component.html',
	styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
	@Input() queue: Queue;
	@Output("loadCurrentSongInPlayer") loadCurrentSongInPlayer: EventEmitter<any> = new EventEmitter();

	constructor() {
		this.queue = new Queue();
	}

	public changeQueueSongIndex(newIndex: number): void {
		this.queue.currentSongIndex = newIndex;
		this.loadCurrentSongInPlayer.emit();
	}

	public moveSongInQueue(event: MouseEvent, songIndex: number, delta: number): void {
		event.stopImmediatePropagation();

		if (songIndex + delta < 0 || songIndex + delta + 1 > this.queue.songs.length) return;

		var temp: Song = this.queue.songs[songIndex];
		this.queue.songs[songIndex] = this.queue.songs[songIndex + delta];
		this.queue.songs[songIndex + delta] = temp;

		if (this.queue.currentSongIndex == songIndex) {
			this.queue.currentSongIndex += delta;
		} else if (this.queue.currentSongIndex - delta == songIndex) {
			this.queue.currentSongIndex -= delta;
		}
	}

	public deleteSongFromQueue(event: MouseEvent, songIndex: number): void {
		event.stopImmediatePropagation();

		if (songIndex <= this.queue.currentSongIndex) {
			this.queue.currentSongIndex -= 1;
		}

		this.queue.songs.splice(songIndex, 1);

		if (songIndex == this.queue.currentSongIndex) {
			this.loadCurrentSongInPlayer.emit();
		}
	}
}
