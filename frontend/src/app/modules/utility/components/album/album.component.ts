import { Component, Input } from '@angular/core';
import { Album } from 'src/app/models/album';
import { Song } from 'src/app/models/song';
import { APIService } from 'src/app/services/api.service';
import { SharedContextMenuService } from 'src/app/services/shared-context-menu.service';
import { SharedQueueService } from 'src/app/services/shared-queue.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  
    @Input() album!: Album;

    songs: Song[] = [];
  
    constructor(private sharedQueueService: SharedQueueService, private apiService: APIService,private sharedContextMenuService: SharedContextMenuService) {}

    public addAlbumToQueue(): void {
      /*
      * Add the album to the queue
      * @param {void}
      * @return {void}
      */
    
      //Load the songs of the album from the backend if not already loaded
      if (this.songs.length == 0) {
        this.loadSongs().then(() => {
          //Add the songs to the queue
          this.addSongsToQueue();

        });
      }
      else {
        //Add the songs to the queue
        this.addSongsToQueue();
      }

    }

    public async loadSongs() : Promise<void> {
      /* 
      * Load the songs of the album from the backend
      * @param {void}
      * @return {Promise<void>}
      */
      return new Promise<void>((resolve, reject) => {
        this.apiService.getSongs({albumId: this.album.id}).subscribe(
          (response: any) => {
            this.songs = [];
            for(let i = 0; i < response.length; i++) {
              let song = new Song().deserialize(response[i]);
              this.songs.push(song);
            }
            resolve();
          }
        );
      }
      );
    }

    public addSongsToQueue(songIndex?: number): void {
      /*
      * Add the songs of the album to the queue
      * @param {number} songIndex - The index of the song to play first
      * @return {void}
      */
      let queue = this.sharedQueueService.getQueue();
      queue.setSongs(this.songs);
      if (songIndex) {
        queue.setCurrentSongIndex(songIndex);
      }
      this.sharedQueueService.setDoReloadPlayer(true);
    }

    public openContextMenu(event:Event): void {
      /*
      * Open the context menu for the album
      * @param {Event} event - The event that triggered the opening of the context menu
      * @return {void}
      */
      event.preventDefault();
      this.loadSongs().then(() => {
        this.sharedContextMenuService.showContextMenu({albumSongs: this.songs});
      });
    }

}
