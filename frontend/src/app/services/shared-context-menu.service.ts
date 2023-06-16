import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Song } from '../models/song';
import { Album } from '../models/album';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class SharedContextMenuService {

	public functionCallEvent$: Subject<{song?:Song, albumSongs?:Song[], artist?:User}> = new Subject<{song?:Song, albumSongs?:Song[], artist?:User}>();

	constructor() { }

	public showContextMenu(obj:{song?:Song, albumSongs?:Song[], artist?:User}): void {
		/**
		 * Shows the context menu to the user when right clicking on a song, album or artist
		 * @param obj An object containing either a song, an album or an artist
		 */
		this.functionCallEvent$.next(obj);
	}
}
