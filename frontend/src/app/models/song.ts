import { Album } from "./album";

export class Song {
	id: number;
	name: string;
	album: Album;
	releaseYear: number;
	recordingLink: string;
	lyrics: string;
	listenings: number;

	constructor(id: number, name: string, album: Album,	releaseYear: number, recordingLink: string, lyrics: string, listenings: number) {
		this.id = id;
		this.name = name;
		this.album = album;
		this.releaseYear = releaseYear;
		this.recordingLink = recordingLink;
		this.lyrics = lyrics;
		this.listenings = listenings;
	}
}
