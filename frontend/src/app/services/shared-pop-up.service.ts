import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SharedPopUpService {

	public popUpCallEvent$: Subject<{message:String, timedisplay?:number, color?:String, priority?:number}> = new Subject<{message:String, timedisplay?:number, color?:String, priority?:number}>();

	constructor() { }

	public showPopUp(obj:{message:String, timedisplay?:number, color?:String, priority?:number}): void {
		/**
		 * Shows a popup message at the bottom of the string
		 * @param obj Object with the following properties:
		 * @param obj.message The message to be displayed
		 * @param obj.timedisplay The time the message will be displayed in milliseconds (default: 3000)
		 * @param obj.color The color of the message (default: 'black')
		 * @param obj.priority The priority of the message (default: 0)
		 */
		this.popUpCallEvent$.next(obj);
	}
}
