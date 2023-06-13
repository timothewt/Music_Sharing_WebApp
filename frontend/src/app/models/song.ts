import { Album } from "./album";
import { Deserializable } from "./deserializable";
import { Observable } from 'rxjs';

export class Song implements Deserializable {
	id: number;
	name: string;
	album: Album;
	releaseYear: number;
	recordingLink: string;
	lyrics: string;
	listenings: number;
	duration: number;
	tags: string[];

	constructor(/*id: number, name: string, album: Album, releaseYear: number, recordingLink: string, lyrics: string, listenings: number*/) {
		this.id = 0;
		this.name = "";
		this.album = new Album();
		this.releaseYear = 0;
		this.recordingLink = "";
		this.lyrics = "";
		this.listenings = 0;
		this.duration = 0;
		this.tags = [];
	}

	deserialize(input: any): this {
		this.id = input.id;
		this.name = input.name;
		this.album = new Album().deserialize(input.album);
		this.releaseYear = input.release_year;
		this.recordingLink = input.recording_link;
		this.lyrics = input.lyrics;
		this.listenings = input.listenings;
		this.duration = input.duration_ms;
		return this;
	}


}
