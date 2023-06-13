import { Album } from './album';

export class UploadAlbum extends Album {

	coverFile !: File;

	constructor() {
		super ();
		this.coverFile = new File([], "");
	}
}
