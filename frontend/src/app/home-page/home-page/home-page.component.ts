import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';

import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	popularSongs: Song[] = [];
	popularAlbums: Album[] = [];
	popularArtists: User[] = [];

	constructor(private apiService: APIService, private sharedQueueService: SharedQueueService) {}

	ngOnInit() {
		// Fetching popular songs
		this.apiService.getSongs({limit: 5, mostPopular: true}).subscribe(
			(response: any) => {
				for(let i = 0; i < response.length; i++) {
					let song = new Song().deserialize(response[i]);
					this.popularSongs.push(song);
				}
			}
		);
		// Fetching popular albums
		this.apiService.getAlbums({limit: 5, mostPopular: true}).subscribe(
			(response: any) => {
				for(let i = 0; i < response.length; i++) {
					let album = new Album().deserialize(response[i]);
					this.popularAlbums.push(album);
				}
			}
		);
		// Fetching popular artists
		this.apiService.getUsers({limit: 5, mostPopular: true}).subscribe(
			(response: any) => {
				for(let i = 0; i < response.length; i++) {
					let artist = new User().deserialize(response[i]);
					this.popularArtists.push(artist);
				}
			}
		);
	}
}
