import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-arrows-nav',
  templateUrl: './arrows-nav.component.html',
  styleUrls: ['./arrows-nav.component.scss']
})
export class ArrowsNavComponent {
  constructor(private location: Location) { 

  }

  goBack(): void {
    console.log("Go back");
    this.location.back();
  }

  goForward(): void {
    console.log("Go forward");
    this.location.forward();
  }

}
