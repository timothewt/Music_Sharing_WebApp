import { Song } from "./song";

export class Queue {
	songs: Song[];
	currentSongIndex: number;

	constructor() {
		this.songs = [];
		this.currentSongIndex = 0;
	}

	public addToQueue(song: Song) {
		this.songs.push(song);
	}
}
