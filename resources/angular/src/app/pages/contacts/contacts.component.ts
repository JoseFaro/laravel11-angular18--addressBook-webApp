import { ButtonComponent } from '../../components/button/button.component';
import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ButtonComponent, HttpClientModule, NgFor],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  providers: [ContactsService, HttpClientModule],
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

  createContact(): void {
    this.router.navigate(['/createContact']);
  }

  deleteContact(contactId: number): void {
    this.contactsService.deleteContact(contactId).subscribe(
      () => {
        this.loadContacts();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editContact(contactId: number): void {
    this.router.navigate([`/editContact/${contactId}`]);
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

  viewContact(contactId: number): void {
    this.router.navigate([`/viewContact/${contactId}`]);
  }
}
