import { User } from "./user";
import { Deserializable } from "./deserializable";

export class Album {
	id: number;
	name: string;
	artist: User;
	releaseYear: number;
	description: string;
	cover: string; // url of the image
	listenings: number;

	constructor(/*id: number, name: string, artist: User, releaseYear: number, description: string, cover: string, listenings: number*/) {
		this.id = 0;
		this.name = "";
		this.artist = new User();
		this.releaseYear = 0;
		this.description = "";
		this.cover = "";
		this.listenings = 0;
	}

	deserialize(input: any): this {
		this.id = input.id;
		this.name = input.name;
		this.artist = new User().deserialize(input.artist);
		this.releaseYear = input.release_year;
		this.description = input.description;
		this.cover = input.cover_link;
		this.listenings = input.listenings;

		return this;	
	}

}
