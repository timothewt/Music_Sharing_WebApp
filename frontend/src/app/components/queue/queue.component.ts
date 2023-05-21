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
}
