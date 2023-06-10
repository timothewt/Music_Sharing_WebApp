import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPopUpService {

  public popUpCallEvent$: Subject<{message:String, timedisplay?:number, color?:String, priority?:number}> = new Subject<{message:String, timedisplay?:number, color?:String, priority?:number}>();

  constructor() { }

  public showPopUp(obj:{message:String, timedisplay?:number, color?:String, priority?:number}): void {
    this.popUpCallEvent$.next(obj);
  }
}
