import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song';
import { SharedQueueService } from 'src/app/services/shared-queue.service';

@Component({
	selector: 'app-song',
	templateUrl: './song.component.html',
	styleUrls: ['./song.component.scss']
})
export class SongComponent {
	//Main song of the component
	@Input() song!: Song;
	@Input() index!: number;
	
	constructor(private sharedQueueService: SharedQueueService) {}

	public playSong(): void {
		let queue = this.sharedQueueService.getQueue();
		queue.setSongs([this.song]);

		this.sharedQueueService.setDoReloadPlayer(true);
	}
}
