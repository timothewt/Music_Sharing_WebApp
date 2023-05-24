import { Song } from "./song";

export class Queue {
	private songs: Song[];
	private currentSongIndex: number;

	constructor() {
		this.songs = [];
		this.currentSongIndex = 0;
	}

	public addSong(song: Song): void {
		this.songs.push(song);
	}

	public addSongAfterCurrentlyPlaying(song: Song): void {
		this.songs.splice(this.currentSongIndex + 1, 0, song);
	}

	public moveSongInQueue(songIndex: number, delta: number): void {
		if (songIndex + delta < 0 || songIndex + delta + 1 > this.songs.length) return;

		var temp: Song = this.songs[songIndex];
		this.songs[songIndex] = this.songs[songIndex + delta];
		this.songs[songIndex + delta] = temp;

		if (this.currentSongIndex == songIndex) {
			this.currentSongIndex += delta;
		} else if (this.currentSongIndex - delta == songIndex) {
			this.currentSongIndex -= delta;
		}
	}

	public deleteSongFromQueue(songIndex: number): void {
		if (songIndex <= this.currentSongIndex && this.currentSongIndex != 0) {
			this.currentSongIndex -= 1;
		}

		this.songs.splice(songIndex, 1);
	}

	public getSongs(): Song[] {
		return this.songs
	}

	public getCurrentSongIndex(): number {
		return this.currentSongIndex;
	}

	public getCurrentSong(): Song {
		if (this.currentSongIndex < this.songs.length) {
			return this.songs[this.currentSongIndex];
		} 
		return new Song();
	}

	public getQueueLength(): number {
		return this.songs.length;
	}

	public setCurrentSongIndex(newIndex: number): void {
		this.currentSongIndex = newIndex;
	}

	public setSongs(songs: Song[]): void {
		this.songs = songs;
	}
}
