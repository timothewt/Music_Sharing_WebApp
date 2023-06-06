import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Song } from '../models/song';
import { Album } from '../models/album';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedContextMenuService {

  public functionCallEvent$: Subject<{song?:Song, albumSongs?:Song[], artist?:User}> = new Subject<{song?:Song, albumSongs?:Song[], artist?:User}>();

  constructor() { }

  public showContextMenu(obj:{song?:Song, albumSongs?:Song[], artist?:User}): void {
    this.functionCallEvent$.next(obj);
  }
}
