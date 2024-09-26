import { Component } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  providers: [HttpClientModule, ContactsService],
})
export class ContactsComponent {
  contacts: any[] = [];

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe(
      (response) => {
        this.contacts = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteContact(contactId: number): void {
    this.contactsService.deleteContact(contactId).subscribe(
      (response) => {
        console.log('deleted');
        this.loadContacts();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
