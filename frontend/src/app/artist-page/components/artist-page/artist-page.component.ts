import { Component, OnInit } from '@angular/core';
import { Album } from '../../../models/album';
import { User } from '../../../models/user';
import { Song } from '../../../models/song';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { SharedQueueService } from '../../../services/shared-queue.service';
import { SharedAuthService } from '../../../services/shared-auth.service';


@Component({
	selector: 'app-artist-page',
	templateUrl: './artist-page.component.html',
	styleUrls: ['./artist-page.component.scss']
})
export class ArtistPageComponent implements OnInit {
	
	//Main artist of the page
	artist: User = new User();

	//Albums of the artist
	artistAlbums: Album[] = [];

	//Songs of the artist
	artistSongs: Song[] = [];

	constructor(private _Activatedroute: ActivatedRoute, private apiService: APIService, private sharedQueueService: SharedQueueService, public authService: SharedAuthService, private router:Router) {}

	ngOnInit(): void {
		this._Activatedroute.paramMap.subscribe(params => {
			//Get the user id from the url
			let userId : number  = Number(params.get('id'));

			//Load the user infos from the backend
			this.apiService.getUserById(userId).subscribe(
				(response: any) => {
					this.artist.deserialize(response);
				}
			);

			//Load the albums of the user from the backend
			this.apiService.getAlbums({artistId: userId}).subscribe(
				(response: any) => {
					this.artistAlbums = [];
					for(let i = 0; i < response.length; i++) {
						let album = new Album().deserialize(response[i]);
						this.artistAlbums.push(album);
					}
				}
			);

			//Load the songs of the user from the backend
			this.apiService.getSongs({artistId: userId}).subscribe(
				(response: any) => {
					this.artistSongs = [];
					for(let i = 0; i < response.length; i++) {
						let song = new Song().deserialize(response[i]);
						this.artistSongs.push(song);
					}

					//Sort the songs by title (for the moment)
					this.artistSongs.sort((a, b) => (a.name > b.name) ? 1 : -1);
				}
			);
		});
	}

	addArtistSongsToQueue(): void {
		this.sharedQueueService.getQueue().setSongs(this.artistSongs);
		this.sharedQueueService.getQueue().setCurrentSongIndex(0);
		this.sharedQueueService.setDoReloadPlayer(true);
	}

	logout(): void {
		this.authService.logout();
	}

	upload(): void {
		// Redirect to upload page using router
		this.router.navigate(['/upload']);
	}

}
