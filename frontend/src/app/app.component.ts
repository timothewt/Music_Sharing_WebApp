import { Component, ViewChild } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';
import { User } from './models/user';
import { Album } from './models/album';
import { Song } from './models/song';
import { Queue } from './models/queue';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'frontend';

	@ViewChild("player", {static:false}) playerComponent: PlayerComponent;

	artist: User;
	album: Album;
	queue: Queue;

	constructor() {
		this.playerComponent = new PlayerComponent();
		this.artist = new User(802, "Mogwai", "", new Date(), "", "https://i.scdn.co/image/ab6761610000e5ebae7e4f81c7fe0747a61722ed", "");
		this.album = new Album(1228, "Young Team", this.artist, 1997, "", "https://i.scdn.co/image/ab67616d00001e029b6e9909a1ce872eac9501aa", 0);
		
		this.queue = new Queue();

		this.queue.songs.push(new Song(9287, "With Portfolio", this.album, 1997, "https://p.scdn.co/mp3-preview/cb690e73c7653ac8d927f6b9801e5bf9470a471d?cid=774b29d4f13844c495f206cafdad9c86", "", 0));
		this.queue.songs.push(new Song(9283, "Like Herod", this.album, 1997, "https://p.scdn.co/mp3-preview/f14185ce64c5082ed2f88faa6820674983629351?cid=774b29d4f13844c495f206cafdad9c866", "", 0));
		this.queue.songs.push(new Song(9285, "Radar Maker", this.album, 1997, "https://p.scdn.co/mp3-preview/374337753e9b9024bed15d1cfea1a2763b210e28?cid=774b29d4f13844c495f206cafdad9c86", "", 0));
	}

	ngOnInit() {}

	public loadCurrentSongInPlayer(): void {
		this.playerComponent.loadCurrentSong(this.playerComponent.currentlyPlaying);
	}
}
