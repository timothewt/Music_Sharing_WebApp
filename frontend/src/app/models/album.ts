import { User } from "./user";

export class Album {
	id: number;
	name: string;
	artist: User;
	releaseYear: number;
	description: string;
	cover: string; // url of the image
	listenings: number;

	constructor(id: number, name: string, artist: User, releaseYear: number, description: string, cover: string, listenings: number) {
		this.id = id;
		this.name = name;
		this.artist = artist;
		this.releaseYear = releaseYear;
		this.description = description;
		this.cover = cover;
		this.listenings = listenings;
	}
}
