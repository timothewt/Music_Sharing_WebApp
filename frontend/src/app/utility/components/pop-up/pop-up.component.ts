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

  constructor(private sharedPopUpService: SharedPopUpService) { }

  ngOnInit(): void {
    this.sharedPopUpService.popUpCallEvent$.subscribe(
        (obj:{message:String, timedisplay?:number}) => {
          this.showPopUp(obj);
        }
      );
  }

  public showPopUp(obj:{message:String, timedisplay?:number}): void {
    this.message = obj.message;

    if (obj.timedisplay){
      this.displayTime = obj.timedisplay;
    }
    else {
      this.displayTime = 1000;
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
