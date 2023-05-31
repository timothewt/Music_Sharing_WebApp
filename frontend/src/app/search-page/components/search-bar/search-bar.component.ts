import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  public searchValue: any;

  constructor() { }

  public search() : void {
    console.log(this.searchValue);
  }

}
