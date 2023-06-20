import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Queue } from 'src/app/models/queue';

@Injectable({
	providedIn: 'root'
})
export class SharedQueueService {

	private queue: Queue;
	private doReloadPlayerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public doReloadPlayer$ = this.doReloadPlayerSubject.asObservable();

	constructor() {
		this.queue = new Queue();
	}

	public setDoReloadPlayer(doReload: boolean): void { 
		/**
		 * Sets the doReloadPlayerSubject to the given value (true or false)
		 * If true, the player reloads to the current selected song
		 * @param doReload True or false
		 */
		this.doReloadPlayerSubject.next(doReload);
	}

	public getQueue(): Queue {
		/**
		 * @returns The current queue
		 */
		return this.queue;
	}

	public setQueue(queue: Queue) {
		/**
		 * Sets the current queue to the given queue
		 */
		this.queue = queue;
	}
}