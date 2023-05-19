import { Album } from "./album";

export class Song {
	name: string;
	album: Album;
	release_year: number;
	recording_link: string;
	lyrics: string;
	listenings: number;
	duration_ms: number;

	constructor(name: string, album: Album,	release_year: number, recording_link: string, lyrics: string, listenings: number, duration_ms: number) {
		this.name = name;
		this.album = album;
		this.release_year = release_year;
		this.recording_link = recording_link;
		this.lyrics = lyrics;
		this.listenings = listenings;
		this.duration_ms = duration_ms;
	}
}
