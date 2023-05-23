import { Component, ViewChild } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';
import { ArrowsNavComponent } from './arrows-nav/arrows-nav.component';

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
		this.apiService.getSongs({limit:5, searchedValue: "super"}).subscribe(
			(response: any) => {
				console.log(response);
			},
			(error: any) => {
				alert("Error");
			}
		);
	}

	public loadCurrentSongInPlayer(): void {
		this.playerComponent.loadCurrentSong(this.playerComponent.currentlyPlaying);
	}
}
