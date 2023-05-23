import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Queue } from 'src/app/models/queue';

@Injectable({
	providedIn: 'root'
})
export class SharedQueueService {
	private queueSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	public queue$ = this.queueSubject.asObservable();

	public setQueue(queue: Queue): void {
		// called when the player has to change the currently playing song. Otherwise, changing the queue object through the getter is enough. 
		this.queueSubject.next(queue);
	}

	public getQueueObject(): Queue {
		return this.queueSubject.getValue();
	}
}