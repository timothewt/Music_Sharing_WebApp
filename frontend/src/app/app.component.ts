import { Component, ViewChild, OnInit } from '@angular/core';
import { PlayerComponent } from './player/player/player.component';
import { ArrowsNavComponent } from './components/arrows-nav/arrows-nav.component';
import { Queue } from './models/queue';
import { Song } from './models/song';
import { APIService } from './services/api.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';
import { SharedAuthService } from 'src/app/services/shared-auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	title = 'frontend';
	queue!: Queue;

	constructor(private sharedQueueService: SharedQueueService, private authService: SharedAuthService) {}

	ngOnInit() {
		this.queue = new Queue();
		this.sharedQueueService.setQueue(this.queue);
	}
}
