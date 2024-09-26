import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contactForm/contactForm.component';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ContactFormComponent, HttpClientModule, NgFor],
  templateUrl: './editContact.component.html',
  providers: [ContactsService, HttpClientModule],
})
export class EditContactComponent {
  contact: any = {};

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContact(contactId);
  }

  loadContact(contactId: number): void {
    this.contactsService.getContact(contactId).subscribe(
      (response) => {
        this.contact = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleOnUpdate(formData: any): void {
    this.contactsService.updateContact(formData).subscribe(
      (response) => {
        alert('Contacto actualizado');
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
