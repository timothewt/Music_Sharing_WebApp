export class User {
	username: string;
	email: string;
	date_joined: Date;
	description: string;
	profile_pic: string; // url of the image
	banner: string; // url of the image

	constructor(username: string, email: string, date_joined: date, description: string, profile_pic: string, banner: string) {
		this.username = username;
		this.email = email;
		this.date_joined = date_joined;
		this.description = description;
		this.profile_pic = profile_pic;
		this.banner = banner;
	}
}
