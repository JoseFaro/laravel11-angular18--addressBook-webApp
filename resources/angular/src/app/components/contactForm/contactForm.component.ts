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
  FormArray,
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
  styleUrl: './contactForm.component.scss',
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

      addresses: this.fb.array([]),
      emails: this.fb.array([]),
      phones: this.fb.array([]),
    });
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && changes['contact'].currentValue) {
      this.isCreate = !this.contact?.id;
      this.isUpdate = Boolean(this.contact?.id);
      this.form.patchValue(this.contact);

      // set addresses into form
      if (this.contact?.addresses) {
        while (this.addresses.length) this.addresses.removeAt(0);

        this.contact.addresses.forEach((contactAddress: any) => {
          this.addresses.push(
            this.fb.group({
              is_default: [contactAddress.is_default],
              address: [contactAddress.address],
            })
          );
        });
      }

      // set emails into form
      if (this.contact?.emails) {
        while (this.emails.length) this.emails.removeAt(0);

        this.contact.emails.forEach((contactEmail: any) => {
          this.emails.push(
            this.fb.group({
              is_default: [contactEmail.is_default],
              email: [contactEmail.email],
            })
          );
        });
      }

      // set phones into form
      if (this.contact?.phones) {
        while (this.phones.length) this.phones.removeAt(0);

        this.contact.phones.forEach((contactPhone: any) => {
          this.phones.push(
            this.fb.group({
              is_default: [contactPhone.is_default],
              phone: [contactPhone.phone],
            })
          );
        });
      }
    }
  }

  handleOnAddExtraInfo(type: string): void {
    if (type === 'address') {
      this.addresses.push(
        this.fb.group({
          is_default: [this.addresses.length ? 0 : 1],
          address: [''],
        })
      );
    }

    if (type === 'email') {
      this.emails.push(
        this.fb.group({
          is_default: [this.emails.length ? 0 : 1],
          email: [''],
        })
      );
    }

    if (type === 'phone') {
      this.phones.push(
        this.fb.group({
          is_default: [this.phones.length ? 0 : 1],
          phone: [''],
        })
      );
    }
  }

  handleOnDefaultInfoClick(type: string, index: number, e: any): void {
    if (type === 'address') {
      if (this.form.value.addresses.length <= 1) {
        e.preventDefault();
      } else {
        const addresses = this.form.value.addresses;

        this.form.controls['addresses'].patchValue(
          addresses.map((address: any, indexLoop: any) => ({
            ...address,
            is_default: indexLoop === index,
          }))
        );
      }
    }

    if (type === 'email') {
      if (this.form.value.emails.length <= 1) {
        e.preventDefault();
      } else {
        const emails = this.form.value.emails;

        this.form.controls['emails'].patchValue(
          emails.map((email: any, indexLoop: any) => ({
            ...email,
            is_default: indexLoop === index,
          }))
        );
      }
    }

    if (type === 'phone') {
      if (this.form.value.phones.length <= 1) {
        e.preventDefault();
      } else {
        const phones = this.form.value.phones;

        this.form.controls['phones'].patchValue(
          phones.map((phone: any, indexLoop: any) => ({
            ...phone,
            is_default: indexLoop === index,
          }))
        );
      }
    }
  }

  handleOnRemoveExtraInfo(type: string, index: number): void {
    if (type === 'address') {
      this.addresses.removeAt(index);
      const remainingAddresses = this.form.value.addresses;

      if (remainingAddresses.length) {
        const defaultWasRemoved = remainingAddresses.every(
          ({ is_default }: any) => !is_default
        );

        if (defaultWasRemoved) {
          remainingAddresses[0].is_default = 1;
          this.form.controls['addresses'].patchValue(remainingAddresses);
        }
      }
    }

    if (type === 'email') {
      this.emails.removeAt(index);
      const remainingEmails = this.form.value.emails;

      if (remainingEmails.length) {
        const defaultWasRemoved = remainingEmails.every(
          ({ is_default }: any) => !is_default
        );

        if (defaultWasRemoved) {
          remainingEmails[0].is_default = 1;
          this.form.controls['emails'].patchValue(remainingEmails);
        }
      }
    }

    if (type === 'phone') {
      this.phones.removeAt(index);
      const remainingPhones = this.form.value.phones;

      if (remainingPhones.length) {
        const defaultWasRemoved = remainingPhones.every(
          ({ is_default }: any) => !is_default
        );

        if (defaultWasRemoved) {
          remainingPhones[0].is_default = 1;
          this.form.controls['phones'].patchValue(remainingPhones);
        }
      }
    }
  }

  handleOnSubmit(): void {
    this.onSave.emit(this.form.value);
  }
}
