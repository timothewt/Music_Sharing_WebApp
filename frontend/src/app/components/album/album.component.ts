import { Component, Input } from '@angular/core';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  
    @Input() album!: Album;
  
    constructor() { 
    }
}
