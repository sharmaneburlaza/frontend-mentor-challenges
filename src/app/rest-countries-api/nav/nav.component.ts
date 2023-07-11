import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { COLOR } from '../colors.const'


@Component({
  selector: 'rest-countries-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild('elementRef', { static: false }) elementRef: ElementRef | undefined;
  @Output() darkModeValue: EventEmitter<string> = new EventEmitter<string>();
  icons: any = [];
  darkModeState: any;

  ngOnInit(): void {
    this.icons = [
      {
        id: 'dark',
        class: 'bi bi-moon-fill'
      },
      {
        id: 'light',
        class: 'bi bi-moon'
      }
    ]
    const darkModeAtLocalStore = localStorage.getItem('darkModeState');
    this.darkModeState = darkModeAtLocalStore ? darkModeAtLocalStore : 'dark';
  }

  ngAfterViewInit() {
    this.getDynamicNavStyle();
    this.darkModeValue.emit(this.darkModeState);
  }

  getDynamicNavStyle() {
    if (this.elementRef) {
      const element = this.elementRef.nativeElement;
      if (this.darkModeState === 'dark') {
        element.style.backgroundColor = COLOR.$dm_dark_blue;
        element.style.color = COLOR.$white;
      } else {
        element.style.backgroundColor = COLOR.$white;
        element.style.color = COLOR.$lm_very_dark_blue;
      }
    }
  }

  toggleDarkMode() {
    this.darkModeState = this.darkModeState === 'dark' ? 'light' : 'dark';
    localStorage.setItem('darkModeState', this.darkModeState);
    this.getDynamicNavStyle();
  }
}
