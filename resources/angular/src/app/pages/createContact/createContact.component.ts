import { ButtonComponent } from '../../components/button/button.component';
import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contactForm/contactForm.component';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [ButtonComponent, ContactFormComponent, HttpClientModule, NgFor],
  templateUrl: './createContact.component.html',
  providers: [ContactsService, HttpClientModule],
})
export class CreateContactComponent {
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {}

  handleOnCreate(formData: any): void {
    console.log('sent');
    console.log(formData);
  }
}
