import { Album } from "./album";

export class Song {
	name: string;
	album: Album;
	releaseYear: number;
	recordingLink: string;
	lyrics: string;
	listenings: number;

	constructor(name: string, album: Album,	releaseYear: number, recordingLink: string, lyrics: string, listenings: number) {
		this.name = name;
		this.album = album;
		this.releaseYear = releaseYear;
		this.recordingLink = recordingLink;
		this.lyrics = lyrics;
		this.listenings = listenings;
	}
}
