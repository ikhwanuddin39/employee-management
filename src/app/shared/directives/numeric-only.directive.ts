import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]',
  standalone: true
})
export class NumericOnlyDirective {
  private readonly allowedKeys = ['Backspace', 'Tab', 'Enter', 'Escape', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow navigation and control keys
    if (this.allowedKeys.includes(event.key)) {
      return;
    }
    
    // Allow copy, paste, select all
    if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
      return;
    }

    // Block non-numeric characters
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
