import { ButtonComponent } from '../../components/button/button.component';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ButtonComponent, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './contactForm.component.html',
})
export class ContactFormComponent {
  @Input() contact?: any = {};
  @Output() onSave = new EventEmitter<void>();

  isCreate: boolean = true;
  isUpdate: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      dateOfBirth: [''],
      company: [''],
      website: [''],
      notes: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && changes['contact'].currentValue) {
      this.isCreate = !this.contact?.id;
      this.isUpdate = Boolean(this.contact?.id);
      this.form.patchValue(this.contact);
    }
  }

  handleOnSubmit(): void {
    this.onSave.emit(this.form.value);
  }
}
