import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPopUpService {

  public popUpCallEvent$: Subject<{message:String, timedisplay?:number, color?:String}> = new Subject<{message:String, timedisplay?:number, color?:String}>();

  constructor() { }

  public showPopUp(obj:{message:String, timedisplay?:number, color?:String}): void {
    this.popUpCallEvent$.next(obj);
  }
}
