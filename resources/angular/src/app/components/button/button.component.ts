import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() extraClasses: string = '';
  @Input() label: string = '';
  @Input() fullWidth: boolean = false;
  @Input() size: string = 'md';
  @Input() variant: string = 'primary';

  @Output() onClick = new EventEmitter<void>();

  handleOnClick() {
    this.onClick.emit();
  }
}
