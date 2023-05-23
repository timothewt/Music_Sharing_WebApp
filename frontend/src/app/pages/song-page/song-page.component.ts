import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song';
import { Album } from 'src/app/models/album';
import { User } from 'src/app/models/user';

import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-song-page',
  templateUrl: './song-page.component.html',
  styleUrls: ['./song-page.component.scss']
})
export class SongPageComponent {

  public song: Song = new Song();

  constructor(private _Activatedroute:ActivatedRoute, private apiService: APIService) { 
    console.log("SongPageComponent constructor");
    this._Activatedroute.paramMap.subscribe(params => {
      //Get the song id from the url
      let songId : number  = Number(params.get('id'));

      //Load the song infos from the backend
      this.apiService.getSongById(songId).subscribe(
        (response: any) => {
          console.log(response);
          this.song.deserialize(response);
        }
      );
    });
  }

}
