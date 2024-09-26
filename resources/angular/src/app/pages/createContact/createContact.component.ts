import { ButtonComponent } from '../../components/button/button.component';
import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contactForm/contactForm.component';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [ButtonComponent, ContactFormComponent, HttpClientModule, NgFor],
  templateUrl: './createContact.component.html',
  providers: [ContactsService, HttpClientModule],
})
export class CreateContactComponent {
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  handleOnCreate(formData: any): void {
    this.contactsService.storeContact(formData).subscribe(
      (response) => {
        alert('Contacto creado');
        this.router.navigate([`/editContact/${response.id}`]);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
