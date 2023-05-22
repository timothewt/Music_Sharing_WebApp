import { Deserializable } from "./deserializable";


export class User implements Deserializable {
	id: number;
	username: string;
	email: string;
	dateJoined: Date;
	description: string;
	profilePic: string; // url of the image
	banner: string; // url of the image

	constructor(/*id: number, username: string, email: string, dateJoined: Date, description: string, profilePic: string, banner: string*/) {
		this.id = 0;
		this.username = "";
		this.email = "";
		this.dateJoined = new Date();
		this.description = "";
		this.profilePic = "";
		this.banner = "";
	}

	deserialize(input: any): this {
		this.id = input.id;
		this.username = input.username;
		this.email = input.email;
		this.dateJoined = new Date(input.date_joined);
		this.description = input.description;
		this.profilePic = input.profile_pic;
		this.banner = input.banner;

		return this;
	}
}
