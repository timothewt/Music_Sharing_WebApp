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

	similarArtists: User[] = [];

	// Used when logged in and current user page
	favoriteSongs: Song[] = [];
	favoriteAlbums: Album[] = [];

	isDeleting = false;

	constructor(private _Activatedroute: ActivatedRoute, private apiService: APIService, private sharedQueueService: SharedQueueService, public authService: SharedAuthService, private router: Router) {}

	ngOnInit(): void {
		this._Activatedroute.paramMap.subscribe(params => {
			this.artistAlbums.splice(0);
			this.artistSongs.splice(0);
			this.similarArtists.splice(0);

			//Get the user id from the url
			let userId : number  = Number(params.get('id'));

			//Load the user infos from the backend
			this.apiService.getUserById(userId).subscribe(
				(response: any) => {
					this.artist.deserialize(response);
				}
			);

			//Load the albums of the user from the backend
			this.apiService.getAlbums({artistId: userId, mostPopular: true}).subscribe(
				(response: any) => {
					this.artistAlbums = [];
					for(let i = 0; i < response.length; i++) {
						let album = new Album().deserialize(response[i]);
						this.artistAlbums.push(album);
					}
				}
			);

			//Load the songs of the user from the backend
			this.apiService.getSongs({artistId: userId, mostPopular: true}).subscribe(
				(response: any) => {
					this.artistSongs = [];
					for(let i = 0; i < response.length; i++) {
						let song = new Song().deserialize(response[i]);
						this.artistSongs.push(song);
					}
				}
			);

			//Load the similar artists from the backend
			this.apiService.getSimilarArtists(userId, 8).subscribe(
				(response: any) => {
					this.similarArtists = [];
					for(let i = 0; i < response.length; i++) {
						let user = new User().deserialize(response[i]);
						this.similarArtists.push(user);
					}
				}
			);

			if (this.authService.loggedIn && this.authService.currentUserID == userId) {
				this.apiService.getFavoriteSongs(this.authService.getAccessToken()).subscribe(
					(response: any) => {
						this.favoriteSongs = [];
						for(let i = 0; i < response.length; i++) {
							let song = new Song().deserialize(response[i]);
							this.favoriteSongs.push(song);
						}
					}
				);

				this.apiService.getFavoriteAlbums(this.authService.getAccessToken()).subscribe(
					(response: any) => {
						this.favoriteAlbums = [];
						for(let i = 0; i < response.length; i++) {
							let album = new Album().deserialize(response[i]);
							this.favoriteAlbums.push(album);
						}
					}
				);
			}
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

	deleteAccount(): void {
		this.isDeleting = true;
	}

	handleDialogAnswer(answer: boolean): void {
		if (answer) {
			this.apiService.deleteUser(this.authService.getAccessToken()).subscribe(
				(response: any) => {
					this.logout();
					this.router.navigate(['']);
				}
			);
		} else {
			this.isDeleting = false;
		}
	}

	changePDP(event:any): void {

		if (event.target.files.length > 0) {
			const file = event.target.files[0];

			//Change backend image
			this.apiService.changeProfilePic(this.authService.getAccessToken(), file).subscribe(
				(response: any) => {
						//Change local image
						var reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = (_event) => {
							this.artist.profilePic = reader.result as string;
						}
						console.log(response);
					}

			);
		}
	}

	invalidUrl() {
		this.artist.profilePic = "assets/images/default_pfp.jpg";
	}
}
