import { Component, OnInit, Input, Output, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  @Input() items!: string[]; 
  filteredItems: string[] = [];
  selectedItems: string[] = [];
  dropdownOpen: boolean = false;
  dropdownActive: boolean = false;
  searchText!: String;

  @Output() onSelectionChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
    this.filteredItems = this.items;
  }

  @HostListener('document:click', ['$event'])
	onMouseClick(event: MouseEvent): void {
    /*
    Close the dropdown menu
    * @param {MouseEvent} event - the mouse event
    * @return {void}
    * */
    if (this.dropdownActive == false){
      this.dropdownOpen = false;
    }
    this.dropdownActive = false;
	}

  openDropDown(): void {
    /*
    Open the dropdown menu
    * @param {void}
    * @return {void}
    */
    this.dropdownOpen = true;
    this.dropdownActive = true;
  }

  toggleSelection(item: string) {
    /*
    Toggle the selection of an item
    * @param {string} item - the item to toggle
    * @return {void}
    * */
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }

    let selectedItemsCopy = this.selectedItems.slice();
    this.onSelectionChange.emit(selectedItemsCopy);
  }

  isSelected(item: string): boolean {
    /*
    Check if the item is selected
    * @param {string} item - the item to check
    * @return {boolean} - true if the item is selected, false otherwise
    */
    return this.selectedItems.indexOf(item) > -1;
  }

  filterItems() :void {
    /*
    Filter the items based on the search text
    * @param {void}
    * @return {void}
    */
    this.filteredItems = this.items.filter((item) => item.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  reset(): void {
    /*
    Empty the multiselect
    * @param {void}
    * @return {void}
    */
    this.selectedItems = [];
    this.searchText = "";
    this.filterItems();
  }


}
