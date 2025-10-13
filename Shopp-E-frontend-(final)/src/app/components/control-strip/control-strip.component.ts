import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-control-strip',
  templateUrl: './control-strip.component.html',
  styleUrls: ['./control-strip.component.css']
})
export class ControlStripComponent {
  @Input() isUserLoggedIn: boolean = false;

  @Output() sortChanged = new EventEmitter<string>();
  @Output() searchTriggered = new EventEmitter<string>();
  @Output() cartClicked = new EventEmitter<void>();

  activeSort: string = '';

  // Sort always allowed
  setSort(type: string) {
    this.activeSort = type;
    this.sortChanged.emit(type);
  }

  // Search always allowed
  triggerSearch(searchInput: HTMLInputElement) {
    const value = searchInput ? searchInput.value : '';
    this.searchTriggered.emit(value);
  }

  // Cart requires login (kept on the component level for quick feedback)
  goToCart() {
    if (!this.isUserLoggedIn) {
      alert('Please login first!');
      // use window.location intentionally so that other code (if any) does not intercept
      window.location.href = 'http://localhost:4200/register';
      return;
    }
    this.cartClicked.emit();
  }
}
