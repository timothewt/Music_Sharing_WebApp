import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-delete-pop-up',
	templateUrl: './delete-pop-up.component.html',
	styleUrls: ['./delete-pop-up.component.scss']
})
export class DeletePopUpComponent implements OnInit {

	@Input() toDeleteType: string = "";
	@Input() toDeleteTypeInContent: string = "";
	@Input() objectToDelete: any;
	@Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit(): void {
		if (this.toDeleteType == "Account") {
			this.toDeleteTypeInContent = "account : " + this.objectToDelete.username;
		} else if (this.toDeleteType == "Album") {
			this.toDeleteTypeInContent = "album : " + this.objectToDelete.name;
		} else if (this.toDeleteType == "Song") {
			this.toDeleteTypeInContent = "song : " + this.objectToDelete.name;
		}
	}

	onCancelClick() {
		/*
		* Emits the delete event
		* @param {void}
		* @return {void}
		*/
		this.delete.emit(false);
	}

	onConfirmClick() {
		/*
		* Emits the delete event
		* @param {void}
		* @return {void}
		*/
		this.delete.emit(true);
	}

}
