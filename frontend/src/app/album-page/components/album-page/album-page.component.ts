import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';

import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';
import { SharedAuthService } from 'src/app/services/shared-auth.service';

@Component({
	selector: 'app-album-page',
	templateUrl: './album-page.component.html',
	styleUrls: ['./album-page.component.scss']
})
export class AlbumPageComponent implements OnInit{

	public album: Album = new Album();
	public songs: Song[] = [];
	public color: string = "#000000";
	public isFavorite: boolean = false;
	public isLoggedInUserAlbum: boolean = false;
	public isDeleting: boolean = false;

	similarAlbums: Album[] = [];

	constructor(private _Activatedroute: ActivatedRoute, private apiService: APIService, private sharedQueueService: SharedQueueService, public authService: SharedAuthService, private router: Router) {}

	ngOnInit() {
		this._Activatedroute.paramMap.subscribe(params => {
			this.songs.splice(0);
			this.similarAlbums.splice(0);

			//Get the song id from the url
			let albumId : number  = Number(params.get('id'));

			//Load the album infos from the backend
			this.apiService.getAlbumById(albumId).subscribe(
				(response: any) => {
					this.album.deserialize(response);
				
					if (this.authService.loggedIn && this.album.artist.id == this.authService.currentUserID) {
						this.isLoggedInUserAlbum = true;
					}

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

			this.apiService.getSimilarAlbums(albumId, 7).subscribe(
				(response: any) => {
					for(let i = 0; i < response.length; i++) {
						let album = new Album().deserialize(response[i]);
						this.similarAlbums.push(album);
					}
				}
			);

			if (this.authService.loggedIn) {
				this.apiService.isFavoriteAlbum(albumId, this.authService.getAccessToken()).subscribe(
					(response: any) => {
						this.isFavorite = response.is_favorite;
					}
				);
			}
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

	public addToFavorites() {
		this.apiService.addAlbumToFavorites(this.album.id, this.authService.getAccessToken()).subscribe(
			(response: any) => {
				this.isFavorite = true;
			}
		);
	}

	public removeFromFavorites() {
		this.apiService.removeAlbumFromFavorites(this.album.id, this.authService.getAccessToken()).subscribe(
			(response: any) => {
				this.isFavorite = false;
			}
		);
	}

	public handleDialogAnswer(answer: boolean) {
		if (answer) {
			this.isDeleting = true;
			this.apiService.deleteAlbum(this.album.id, this.authService.getAccessToken()).subscribe(
				(response: any) => {
					this.router.navigate(['/artist/' + this.album.artist.id]);
				}
			);
		} else {
			this.isDeleting = false;
		}
	}
}
