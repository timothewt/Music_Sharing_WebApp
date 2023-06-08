import { Component, OnInit } from '@angular/core';
import { SharedPopUpService } from 'src/app/services/shared-pop-up.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})

export class PopUpComponent {

  public message: String = "";
  public displayTime: number = 1;
  public visible: boolean = false;
  public color: String = "#333";

  constructor(private sharedPopUpService: SharedPopUpService) { }

  ngOnInit(): void {
    this.sharedPopUpService.popUpCallEvent$.subscribe(
        (obj:{message:String, timedisplay?:number}) => {
          this.showPopUp(obj);
        }
      );
  }

  public showPopUp(obj:{message:String, timedisplay?:number, color?:String}): void {
    this.message = obj.message;

    if (obj.timedisplay){
      this.displayTime = obj.timedisplay;
    }
    else {
      this.displayTime = 1000;
    }

    if (obj.color) {
      this.color = obj.color;
    }
    else {
      this.color = "#333";
    }

    this.visible = true;

    setTimeout(() => {
      this.hidePopUp();
    }
    , this.displayTime);

  }

  public hidePopUp(): void {
    this.visible = false;
  }

}
