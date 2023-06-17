import { Component, OnInit, HostListener} from '@angular/core';
import { SharedQueueService } from 'src/app/services/shared-queue.service';
import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';
import { Queue } from 'src/app/models/queue';
import { SharedContextMenuService } from 'src/app/services/shared-context-menu.service';
import { SharedPopUpService } from 'src/app/services/shared-pop-up.service';
import { APIService } from 'src/app/services/api.service';
import { SharedAuthService } from 'src/app/services/shared-auth.service';

@Component({
	selector: 'app-context-menu',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.scss']
})

export class ContextMenuComponent implements OnInit {

	public obj: {song?:Song, albumSongs?:Song[], artist?:User} = {};

	public mouseX: number = 0;
	public mouseY: number = 0;

	public viewportWidth: number = 0;
	public viewportHeight: number = 0;

	public top: number = 0;
	public left: number = 0;

	public numberActions: number = 0;


	public show: boolean = false;
	public activated: boolean = false;

	public isConnected: boolean = this.authService.currentUserID != 0;
	public isSongFavorite: boolean = false;
	public isAlbumFavorite: boolean = false;

	constructor(private authService: SharedAuthService,private apiService: APIService, private sharedQueueService: SharedQueueService, private sharedContextMenuService: SharedContextMenuService, private sharedPopUpService: SharedPopUpService) {}

	ngOnInit(): void {
		this.onResize();

		this.sharedContextMenuService.functionCallEvent$.subscribe(
			(obj:{song?:Song, albumSongs?:Song[], artist?:User}) => {

				this.obj = obj;
				this.isConnected = this.authService.loggedIn;

				if (obj.song) {
					this.apiService.isFavoriteSong(obj.song.id, this.authService.getAccessToken()).subscribe(
						(response: any) => {
							this.isSongFavorite = response.is_favorite;
						}
					);
				}

				if (obj.albumSongs) {
					this.apiService.isFavoriteAlbum(obj.albumSongs[0].album.id, this.authService.getAccessToken()).subscribe(
						(response: any) => {
							this.isAlbumFavorite = response.is_favorite;
						}
					);
				}

				if (obj.song || obj.albumSongs || obj.artist){
					this.showContextMenu(obj);
				}
			}
		);
	}
	
	@HostListener('document:click', ['$event'])
	@HostListener('document:contextmenu', ['$event'])
	onMouseClick(event: MouseEvent): void {
		/*
		* Hides the context menu / updates the position of the context menu on click
		* @param {MouseEvent} event
		* @return {void}
		*/
		this.mouseY = event.pageY;
		this.mouseX = event.pageX;

		this.calculatePos();

		if (this.activated && ( this.obj.song || this.obj.artist) ) {
			this.activated = false;
		}
		else {
			this.show = false;
		}
		
	}

	@HostListener('window:resize')
	onResize(): void {
		/*
		* Updates the viewport width and height on resize
		* @param {void}
		* @return {void}
		*/
		this.viewportHeight = window.innerHeight;
		this.viewportWidth = window.innerWidth;
	}

	public calculatePos(){
		/*
		* Calculates the position of the context menu
		* @param {void}
		* @return {void}
		*/
		if (this.mouseY + 50 > this.viewportHeight) {
			this.top = this.mouseY - 50;
		}
		else {
			this.top = this.mouseY;
		}

		if (this.mouseX + 200 > this.viewportWidth) {
			this.left = this.mouseX - 200;
		}
		else {
			this.left = this.mouseX;
		}
	}

	public showContextMenu(obj:{song?:Song, albumSongs?:Song[], artist?:User}): void {
		/*
		* Shows the context menu
		* @param {Song} song
		* @return {void}
		*/
		if (obj.song) {
			this.numberActions = 2;
		}
		else if (obj.albumSongs) {
			this.numberActions = 2;
		}
		else if (obj.artist) {
			this.numberActions = 1;
		}

		this.show = true;
		this.activated = true;
	}

	public addSongToQueue(): void {
		/*
		* Adds a song to the queue
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.song) return;
		let queue: Queue = this.sharedQueueService.getQueue();
		queue.addSong(this.obj.song);
	}

	public addSongRightAfter() : void {
		/*
		* Adds a song to the queue right after the currently playing song
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.song) return;
		let queue: Queue = this.sharedQueueService.getQueue();
		queue.addSongAfterCurrentlyPlaying(this.obj.song);
	}

	public addAlbumToQueue(): void {
		/*
		* Adds an album to the queue
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.albumSongs) return;
		let queue: Queue = this.sharedQueueService.getQueue();
		for (let song of this.obj.albumSongs) {
			queue.addSong(song);
		}
	}

	public shareSong(): void {
		/*
		* Copies the link of a song to the clipboard
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.song) return;
		let link: string = window.location.href + 'song/' + this.obj.song.id;
		navigator.clipboard.writeText(link).then(() => {
			this.sharedPopUpService.showPopUp({message: 'Link copied to clipboard', timedisplay: 2000});
		}
		);
	}

	public shareAlbum(): void {
		/*
		* Copies the link of an album to the clipboard
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.albumSongs) return;
		let link: string = window.location.href + 'album/' + this.obj.albumSongs[0].album.id;
		navigator.clipboard.writeText(link).then(() => {
			this.sharedPopUpService.showPopUp({message: 'Link copied to clipboard',  timedisplay: 2000});
		}
		);
	}

	public shareArtist(): void {
		/*
		* Copies the link of an artist to the clipboard
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.artist) return;
		let link: string = window.location.href + 'artist/' + this.obj.artist.id;
		navigator.clipboard.writeText(link).then(() => {
			this.sharedPopUpService.showPopUp({message: 'Link copied to clipboard',  timedisplay: 2000});
		}
		);
	}

	public likeSong(): void {
		/*
		* Likes a song
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.song) return;
		this.apiService.addSongToFavorites(this.obj.song.id, this.authService.getAccessToken()).subscribe(
			(response: any) => {
				this.sharedPopUpService.showPopUp({message: 'Song added to favorites',  timedisplay: 1000});
			}
		);
	}

	public unlikeSong(): void {
		/*
		* Unlikes a song
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.song) return;
		this.apiService.removeSongFromFavorites(this.obj.song.id, this.authService.getAccessToken()).subscribe(
			(response: any) => {
				this.sharedPopUpService.showPopUp({message: 'Song removed from favorites',  timedisplay: 1000});
			}
		);
	}

	public likeAlbum(): void {
		/*
		* Likes an album
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.albumSongs) return;
		this.apiService.addAlbumToFavorites(this.obj.albumSongs[0].album.id, this.authService.getAccessToken()).subscribe(
			(response: any) => {
				this.sharedPopUpService.showPopUp({message: 'Album added to favorites',  timedisplay: 1000});
			}
		);
	}

	public unlikeAlbum(): void {
		/*
		* Unlikes an album
		* @param {void}
		* @return {void}
		*/
		if (!this.obj.albumSongs) return;
		this.apiService.removeAlbumFromFavorites(this.obj.albumSongs[0].album.id, this.authService.getAccessToken()).subscribe(
			(response: any) => {
				this.sharedPopUpService.showPopUp({message: 'Album removed from favorites',  timedisplay: 1000});
			}
		);
	}
	
}
