import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() searchEvent = new EventEmitter<string>();

  public searchValue!: string;

  constructor() { }

  public search() : void {
    this.searchEvent.emit(this.searchValue);
  }

}
