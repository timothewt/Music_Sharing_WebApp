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

  public song: Song = new Song();

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
      (song: Song) => {
        this.showContextMenu(song);
      }
    );
  }

  @HostListener('document:click', ['$event'])
  onMouseClick(event: MouseEvent): void {
    this.mouseY = event.pageY;
    this.mouseX = event.pageX;

    this.calculatePos();
    if (this.activated) {
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

  public showContextMenu(song: Song): void {
    this.song = song;
    this.show = true;
    this.activated = true;
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

  public addSongToQueue(): void {
    let queue: Queue = this.sharedQueueService.getQueue();
    queue.addSong(this.song);
  }

  public shareSong(): void {
    // Copy the link to the clipboard
    let link: string = window.location.href + 'song/' + this.song.id;
    navigator.clipboard.writeText(link).then(() => {
      console.log('Link copied to clipboard');
    }
    );
  }
}
