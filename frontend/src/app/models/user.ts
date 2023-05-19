export class User {
	username: string;
	email: string;
	dateJoined: Date;
	description: string;
	profilePic: string; // url of the image
	banner: string; // url of the image

	constructor(username: string, email: string, dateJoined: Date, description: string, profilePic: string, banner: string) {
		this.username = username;
		this.email = email;
		this.dateJoined = dateJoined;
		this.description = description;
		this.profilePic = profilePic;
		this.banner = banner;
	}
}
