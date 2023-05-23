import { Component } from '@angular/core';

import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';

import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
	selector: 'app-album-page',
	templateUrl: './album-page.component.html',
	styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent {

	album: Album = new Album();
	songs: Song[] = [];

	constructor(private _Activatedroute:ActivatedRoute, private apiService: APIService) {
		this._Activatedroute.paramMap.subscribe(params => {
			//Get the song id from the url
			let albumId : number  = Number(params.get('id'));

			//Load the album infos from the backend
			this.apiService.getAlbumById(albumId).subscribe(
				(response: any) => {
					console.log(response);
					this.album.deserialize(response);

					this.apiService.getSongs({albumId: this.album.id}).subscribe(
						(response: any) => {
							console.log(response);
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
}
