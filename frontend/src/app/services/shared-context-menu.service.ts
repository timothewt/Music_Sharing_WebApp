import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SharedContextMenuService {

  public functionCallEvent$: Subject<Song> = new Subject<Song>();

  constructor() { }

  public showContextMenu(song: Song): void {
    this.functionCallEvent$.next(song);
  }


}
