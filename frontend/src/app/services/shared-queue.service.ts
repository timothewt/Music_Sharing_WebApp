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
		this.doReloadPlayerSubject.next(doReload);
	}

	public getQueue(): Queue {
		return this.queue;
	}

	public setQueue(queue: Queue) {
		this.queue = queue;
	}
}