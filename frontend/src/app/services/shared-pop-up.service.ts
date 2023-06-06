import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPopUpService {

  public popUpCallEvent$: Subject<{message:String, timedisplay?:number}> = new Subject<{message:String, timedisplay?:number}>();

  constructor() { }

  public showPopUp(obj:{message:String, timedisplay?:number}): void {
    this.popUpCallEvent$.next(obj);
  }
}
