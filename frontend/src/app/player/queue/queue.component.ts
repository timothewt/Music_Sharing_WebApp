import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Album } from '../../models/album';
import { Song } from '../../models/song';
import { Queue } from '../../models/queue';
import { SharedQueueService } from 'src/app/services/shared-queue.service';

@Component({
	selector: 'app-queue',
	templateUrl: './queue.component.html',
	styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
	@Output("toggleQueueVisibility") toggleQueueVisibility: EventEmitter<any> = new EventEmitter();

	constructor(private sharedQueueService: SharedQueueService) {}

	public getQueue() {
		return this.sharedQueueService.getQueue();
	}

	public changeQueueSongIndex(newIndex: number): void {
		let queue: Queue = this.getQueue();
		queue.setCurrentSongIndex(newIndex);
		this.sharedQueueService.setDoReloadPlayer(true);
	}

	public moveSongInQueue(event: MouseEvent, songIndex: number, delta: number): void {
		event.stopImmediatePropagation(); // when clicking on a move button, does not trigger the changeQueueSongIndex method

		this.getQueue().moveSongInQueue(songIndex, delta);
	}

	public deleteSongFromQueue(event: MouseEvent, songIndex: number): void {
		event.stopImmediatePropagation(); // when clicking on the delete button, does not trigger the changeQueueSongIndex method
		
		let queue: Queue = this.getQueue();
		let currentSongIndex: number = queue.getCurrentSongIndex()
		queue.deleteSongFromQueue(songIndex);

		if (songIndex == currentSongIndex) {
			this.sharedQueueService.setDoReloadPlayer(true);
		}
	}
}
