import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';
import { Queue } from 'src/app/models/queue';

import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';

@Component({
	selector: 'app-song-page',
	templateUrl: './song-page.component.html',
	styleUrls: ['./song-page.component.scss']
})
export class SongPageComponent {

	public song: Song = new Song();

	constructor(private _Activatedroute:ActivatedRoute, private apiService: APIService, private sharedQueueService: SharedQueueService) { 
		
		this._Activatedroute.paramMap.subscribe(params => {
			//Get the song id from the url
			let songId : number  = Number(params.get('id'));

			//Load the song infos from the backend
			this.apiService.getSongById(songId).subscribe(
				(response: any) => {
					this.song = new Song().deserialize(response);
				}
			);
		});
	}

	public addSongToQueue(): void {
		let queue = this.sharedQueueService.getQueueObject();
		queue.addSong(this.song);
		queue.setCurrentSongIndex(queue.songs.length - 1);

		this.sharedQueueService.setQueue(queue);
	}

}
