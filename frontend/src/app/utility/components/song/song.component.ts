import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song';
import { SharedContextMenuService } from 'src/app/services/shared-context-menu.service';
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
	
	constructor(private sharedQueueService: SharedQueueService, private sharedContextMenuService: SharedContextMenuService) {}

	public playSong(): void {
		let queue = this.sharedQueueService.getQueue();
		queue.setSongs([this.song]);

		this.sharedQueueService.setDoReloadPlayer(true);
	}

	public showContextMenu(): void {
		this.sharedContextMenuService.showContextMenu(this.song);
	}
}
