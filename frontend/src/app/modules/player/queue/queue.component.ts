import { Component, Output, EventEmitter } from '@angular/core';
import { Queue } from 'src/app/models/queue';
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
		/*
		* Get the queue from the sharedQueueService
		* params {void}
		* return {Queue} - the queue
		*/
		return this.sharedQueueService.getQueue();
	}

	public changeQueueSongIndex(newIndex: number): void {
		/*
		* Change the current song index in the queue
		* params {number} newIndex - the new index
		* return {void}
		*/
		let queue: Queue = this.getQueue();
		queue.setCurrentSongIndex(newIndex);
		this.sharedQueueService.setDoReloadPlayer(true);
	}

	public moveSongInQueue(event: MouseEvent, songIndex: number, delta: number): void {
		/*
		* Move a song in the queue
		* params {MouseEvent} event - the event
		* params {number} songIndex - the index of the song to move
		* params {number} delta - the delta to move the song
		* return {void}
		*/
		event.stopImmediatePropagation(); // when clicking on a move button, does not trigger the changeQueueSongIndex method

		this.getQueue().moveSongInQueue(songIndex, delta);
	}

	public deleteSongFromQueue(event: MouseEvent, songIndex: number): void {
		/*
		* Delete a song from the queue
		* params {MouseEvent} event - the event
		* params {number} songIndex - the index of the song to delete
		* return {void}
		*/
		event.stopImmediatePropagation(); // when clicking on the delete button, does not trigger the changeQueueSongIndex method
		
		let queue: Queue = this.getQueue();
		let currentSongIndex: number = queue.getCurrentSongIndex()
		queue.deleteSongFromQueue(songIndex);

		if (songIndex == currentSongIndex) {
			this.sharedQueueService.setDoReloadPlayer(true);
		}
	}
}
