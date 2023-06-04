import { Component, OnInit, HostListener} from '@angular/core';
import { SharedQueueService } from 'src/app/services/shared-queue.service';
import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';
import { Queue } from 'src/app/models/queue';
import { SharedContextMenuService } from 'src/app/services/shared-context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})

export class ContextMenuComponent implements OnInit {

  public obj: {song?:Song, albumSongs?:Song[], artist?:User} = {};

  public mouseX: number = 0;
  public mouseY: number = 0;

  public viewportWidth: number = 0;
  public viewportHeight: number = 0;

  public top: number = 0;
  public left: number = 0;


  public show: boolean = false;
  public activated: boolean = false;

  constructor(private sharedQueueService: SharedQueueService, private sharedContextMenuService: SharedContextMenuService) {}

  ngOnInit(): void {
    this.onResize();

    this.sharedContextMenuService.functionCallEvent$.subscribe(
      (obj:{song?:Song, albumSongs?:Song[], artist?:User}) => {

        this.obj = obj;

        if (obj.song || obj.albumSongs || obj.artist){
          this.showContextMenu(obj);
          console.log(obj);
        }
      }
    );
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:contextmenu', ['$event'])
  onMouseClick(event: MouseEvent): void {
    this.mouseY = event.pageY;
    this.mouseX = event.pageX;

    this.calculatePos();

    if (this.activated && ( this.obj.song || this.obj.artist) ) {
      this.activated = false;
    }
    else {
      this.show = false;
    }
    
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewportHeight = window.innerHeight;
    this.viewportWidth = window.innerWidth;
  }

  public calculatePos(){
    if (this.mouseY + 50 > this.viewportHeight) {
      this.top = this.mouseY - 50;
    }
    else {
      this.top = this.mouseY;
    }

    if (this.mouseX + 200 > this.viewportWidth) {
      this.left = this.mouseX - 200;
    }
    else {
      this.left = this.mouseX;
    }
  }

  public showContextMenu(obj:{song?:Song, albumSongs?:Song[], artist?:User}): void {
    this.show = true;
    this.activated = true;
  }

  public addSongToQueue(): void {
    if (!this.obj.song) return;
    let queue: Queue = this.sharedQueueService.getQueue();
    queue.addSong(this.obj.song);
  }

  public addAlbumToQueue(): void {
    if (!this.obj.albumSongs) return;
    let queue: Queue = this.sharedQueueService.getQueue();
    for (let song of this.obj.albumSongs) {
      queue.addSong(song);
    }
  }

  public shareSong(): void {
    if (!this.obj.song) return;
    let link: string = window.location.href + 'song/' + this.obj.song.id;
    navigator.clipboard.writeText(link).then(() => {
      console.log('Link copied to clipboard');
    }
    );
  }

  public shareAlbum(): void {
    if (!this.obj.albumSongs) return;
    let link: string = window.location.href + 'album/' + this.obj.albumSongs[0].album.id;
    navigator.clipboard.writeText(link).then(() => {
      console.log('Link copied to clipboard');
    }
    );
  }

  public shareArtist(): void {
    if (!this.obj.artist) return;
    let link: string = window.location.href + 'artist/' + this.obj.artist.id;
    navigator.clipboard.writeText(link).then(() => {
      console.log('Link copied to clipboard');
    }
    );
  }
}
