export class User {
	id: number;
	username: string;
	email: string;
	dateJoined: Date;
	description: string;
	profilePic: string; // url of the image
	banner: string; // url of the image

	constructor(id: number, username: string, email: string, dateJoined: Date, description: string, profilePic: string, banner: string) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.dateJoined = dateJoined;
		this.description = description;
		this.profilePic = profilePic;
		this.banner = banner;
	}
}
