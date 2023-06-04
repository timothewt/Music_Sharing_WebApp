import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { SharedContextMenuService } from 'src/app/services/shared-context-menu.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {

  @Input() artist!: User;

  constructor(private sharedContextMenuService: SharedContextMenuService) { }

  showContextMenu(event:Event): void {
    event.preventDefault();
    this.sharedContextMenuService.showContextMenu({artist: this.artist});
  }
}
