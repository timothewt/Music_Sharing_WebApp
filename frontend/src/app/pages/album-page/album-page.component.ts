import { Component } from '@angular/core';

import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';
import { Queue } from 'src/app/models/queue';

import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';

@Component({
	selector: 'app-album-page',
	templateUrl: './album-page.component.html',
	styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent {

	album: Album = new Album();
	songs: Song[] = [];

	constructor(private _Activatedroute:ActivatedRoute, private apiService: APIService, private sharedQueueService: SharedQueueService) {
		this._Activatedroute.paramMap.subscribe(params => {
			//Get the song id from the url
			let albumId : number  = Number(params.get('id'));

			//Load the album infos from the backend
			this.apiService.getAlbumById(albumId).subscribe(
				(response: any) => {
					this.album.deserialize(response);

					this.apiService.getSongs({albumId: this.album.id}).subscribe(
						(response: any) => {
							for(let i = 0; i < response.length; i++) {
								let song = new Song().deserialize(response[i]);
								this.songs.push(song);
							}
						}
					);
				}
			);
		});
	}

	public addAlbumToQueue(songIndex?: number): void {
		let queue = this.sharedQueueService.getQueue();
		queue.setSongs(this.songs);
		if (songIndex) {
			queue.setCurrentSongIndex(songIndex);
		}

		this.sharedQueueService.setDoReloadPlayer(true);
	}
}
