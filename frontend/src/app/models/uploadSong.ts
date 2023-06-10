import { Song } from "./song";

export class UploadSong extends Song {

    recordingFile !: File;

    constructor() {
        super ();
        this.recordingFile = new File([], "");
    }
}