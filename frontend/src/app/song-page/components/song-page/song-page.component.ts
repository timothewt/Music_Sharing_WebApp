import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';

import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';
import { SharedAuthService } from 'src/app/services/shared-auth.service';

@Component({
	selector: 'app-song-page',
	templateUrl: './song-page.component.html',
	styleUrls: ['./song-page.component.scss']
})
export class SongPageComponent implements OnInit {

	public song: Song = new Song();
	public color: string = "#000000";
	public isFavorite: boolean = false;
	public isLoggedInUserSong: boolean = false;
	public isDeleting: boolean = false;

	similarSongs: Song[] = [];

	constructor(private _Activatedroute:ActivatedRoute, public apiService: APIService, private sharedQueueService: SharedQueueService, public authService: SharedAuthService, private router: Router) {}

	ngOnInit() {

		this._Activatedroute.paramMap.subscribe(params => {
			this.isLoggedInUserSong = false;
			this.similarSongs.splice(0);

			//Get the song id from the url
			let songId: number = Number(params.get('id'));

			//Load the song infos from the backend
			this.apiService.getSongById(songId).subscribe(
				(response: any) => {
					this.song = new Song().deserialize(response);
				
					if (this.authService.loggedIn && this.song.album.artist.id == this.authService.currentUserID) {
						this.isLoggedInUserSong = true;
					}
				}
			);

			this.apiService.getSimilarSongs(songId, 7).subscribe(
				(response: any) => {
					for(let i = 0; i < response.length; i++) {
						let song = new Song().deserialize(response[i]);
						this.similarSongs.push(song);
					}
				}
			);

			if (this.authService.loggedIn) {
				this.apiService.isFavoriteSong(songId, this.authService.getAccessToken()).subscribe(
					(response: any) => {
						this.isFavorite = response.is_favorite;
					}
				);
			}

		});
	}

	public playSong(): void {
		let queue = this.sharedQueueService.getQueue();
		queue.setSongs([this.song]);

		this.sharedQueueService.setDoReloadPlayer(true);
	}

	public addToFavorites() {
		this.apiService.addSongToFavorites(this.song.id, this.authService.getAccessToken()).subscribe(
			(response: any) => {
				this.isFavorite = true;
			}
		);
	}

	public removeFromFavorites() {
		this.apiService.removeSongFromFavorites(this.song.id, this.authService.getAccessToken()).subscribe(
			(response: any) => {
				this.isFavorite = false;
			}
		);
	}

	public handleDialogAnswer(answer: boolean) {
		if (answer) {
			this.isDeleting = true;
			this.apiService.deleteSong(this.song.id, this.authService.getAccessToken()).subscribe(
				(response: any) => {
					this.router.navigate(['/artist/' + this.song.album.artist.id]);
				}
			);
		} else {
			this.isDeleting = false;
		}
	}

}
