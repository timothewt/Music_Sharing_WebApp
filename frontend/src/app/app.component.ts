import { Component, ViewChild } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';
import { ArrowsNavComponent } from './arrows-nav/arrows-nav.component';
import { Queue } from './models/queue';
import { Song } from './models/song';
import { APIService } from './services/api.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'frontend';
	queue: Queue;

	constructor(private apiService: APIService, private sharedQueueService: SharedQueueService) {
		this.queue = new Queue();
		this.sharedQueueService.setQueue(this.queue);
		setTimeout(() => {
		this.apiService.getSongs({albumId: 1228}).subscribe(
						(response: any) => {
							for(let i = 0; i < response.length; i++) {
								let song = new Song().deserialize(response[i]);
								let queue: Queue = this.sharedQueueService.getQueueObject();
								queue.addSong(song);
								this.sharedQueueService.setQueue(queue);
							}
						}
					);
		}, 0)
	}

	ngOnInit() {}
}
