import { Component } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {
  items: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'];

  filteredItems: string[] = [];
  
  selectedItems: string[] = [];
  dropdownOpen = false;

  searchText!: String;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleSelection(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  isSelected(item: string): boolean {
    return this.selectedItems.indexOf(item) > -1;
  }

  filterItems() {
    // Use the searchText to filter the items
    this.filteredItems = this.items.filter((item) => item.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  removeItem(index:number){
    this.selectedItems.splice(index, 1);
  }
}
