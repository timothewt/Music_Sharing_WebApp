import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';

import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';

@Component({
	selector: 'app-song-page',
	templateUrl: './song-page.component.html',
	styleUrls: ['./song-page.component.scss']
})
export class SongPageComponent implements OnInit {

	public song: Song = new Song();

	constructor(private _Activatedroute:ActivatedRoute, private apiService: APIService, private sharedQueueService: SharedQueueService) {}

	ngOnInit() {
		this._Activatedroute.paramMap.subscribe(params => {
			//Get the song id from the url
			let songId: number = Number(params.get('id'));

			//Load the song infos from the backend
			this.apiService.getSongById(songId).subscribe(
				(response: any) => {
					this.song = new Song().deserialize(response);
				}
			);
		});
	}

	public playSong(): void {
		let queue = this.sharedQueueService.getQueue();
		queue.setSongs([this.song]);

		this.sharedQueueService.setDoReloadPlayer(true);
	}

}
