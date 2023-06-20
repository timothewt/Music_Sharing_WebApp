import { Component} from '@angular/core';
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
  public priority: number = 0;
  public id: number = 0;

  public queuePopUp: {message:String, timedisplay:number, color:String, priority:number, id:number}[] = [];
  public maxQueueSize: number = 5;
  

  constructor(private sharedPopUpService: SharedPopUpService) { }

  ngOnInit(): void {
    this.sharedPopUpService.popUpCallEvent$.subscribe(
        (obj:{message:String, timedisplay?:number, color?:String, priority?:number}) => {
          this.addToQueue(obj);
        }
      );
  }

  public addToQueue(obj:{message:String, timedisplay?:number, color?:String, priority?:number}): void {
    /*
    * Add a pop up to the queue to be displayed
    * @param {message:String, timedisplay?:number, color?:String, priority?:number} obj - The pop up to be added to the queue
    * @return void
    */

    // Correctly setup the pop up object
    let popUp : {message:String, timedisplay:number, color:String, priority:number, id: number} = {
      message: obj.message,
      timedisplay: obj.timedisplay ? obj.timedisplay : 1000,
      color: obj.color ? obj.color : "#333",
      priority: obj.priority ? obj.priority : 0,
      id: Math.floor(Math.random() * 1000000000)
    }


    if (this.priority < popUp.priority) {
      //Stop current and show new if higher priority
      this.queuePopUp.unshift(popUp);
      this.switchToNextPopUp();
    }
    else {
      if (this.queuePopUp.length >= 0) {
        this.queuePopUp.push(popUp);
        if (this.visible == false) {
          this.switchToNextPopUp();
        }
      }
    }

  }

  public switchToNextPopUp(): void {
    /*
    * Switch to the next pop up in the queue
    * @param {void}
    * @return {void}
    */
    if (this.queuePopUp.length > 0) {
      this.usePopUp(this.queuePopUp[0]);
      this.closeInXSeconds(this.queuePopUp[0].id, this.queuePopUp[0].timedisplay);
      this.queuePopUp.shift();
      this.showPopUp();
    }
  }

  public showPopUp(): void {
    /*
    * Show the pop up with the correct popup object
    * @param {void}
    * @return {void}
    */
    this.visible = true;
  }

  public hidePopUp(): void {
    /*
    Hide the pop up
    @param {void}
    @return {void}
    */
    this.visible = false;
  }

  public usePopUp(obj:{message:String, timedisplay:number, color:String, priority:number, id:number}): void {
    /*
    * Use the pop up object to display the pop up
    * @param {message:String, timedisplay:number, color:String, priority:number, id:number} obj - The pop up object to use
    * @return {void}
    */
    this.message = obj.message;
    this.displayTime = obj.timedisplay;
    this.color = obj.color;
    this.priority = obj.priority;
    this.id = obj.id;
  }

  public closeInXSeconds(idToClose:number, time:number): void {
    /*
    Close the pop up in x seconds
    @param {number} idToClose - The id of the pop up to close
    @param {number} time - The time in milliseconds to close the pop up
    @return {void}
    */
    setTimeout(() => {
      if (this.id == idToClose) {
        this.hidePopUp();
        setTimeout(() => {
          this.switchToNextPopUp();
        }, 500);
      }
    }, time);
  }

}
