import { Component, ViewChild } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';
import { User } from './models/user';
import { Album } from './models/album';
import { Song } from './models/song';
import { Queue } from './models/queue';
import { APIService } from './services/api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'frontend';

	@ViewChild("player", {static:false}) playerComponent: PlayerComponent;

	queue: Queue;

	constructor(private apiService: APIService) {
		this.playerComponent = new PlayerComponent();
		this.queue = new Queue();
	}

	ngOnInit() {
		for (let i = 0; i < 5; i++) {
			this.apiService.getSongById(4000 + i).subscribe(
				(response: any) => {
					this.queue.songs.push(new Song().deserialize(response));
				},
				(error: any) => {
					alert("No song of id " + (i + 4000));
				}
			);
		}
	}

	public loadCurrentSongInPlayer(): void {
		this.playerComponent.loadCurrentSong(this.playerComponent.currentlyPlaying);
	}
}
