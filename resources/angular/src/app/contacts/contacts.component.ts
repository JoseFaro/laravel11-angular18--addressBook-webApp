import { Component } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

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
        this.loadContacts();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createContact(): void {
    this.router.navigate(['/createContact']);
  }

  editContact(contactId: number): void {
    this.router.navigate([`/editContact/${contactId}`]);
  }

  viewContact(contactId: number): void {
    this.router.navigate([`/viewContact/${contactId}`]);
  }
}
