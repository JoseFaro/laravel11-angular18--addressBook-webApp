import { BehaviorSubject, Subscription } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import { Component, DoCheck } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { filterContacts } from './helpers/filterContacts';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ButtonComponent, HttpClientModule, FormsModule, NgFor],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  providers: [ContactsService, HttpClientModule],
})
export class ContactsComponent {
  contacts: any[] = [];
  filteredContacts: any[] = [];

  private searchFilter = new BehaviorSubject<string>('');
  private subscription!: Subscription;

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

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

  handleOnFilterChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchFilter.next(inputElement.value);
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe(
      (response) => {
        this.contacts = response;

        this.subscription = this.searchFilter.subscribe((searchFilterValue) => {
          this.filteredContacts = filterContacts(
            searchFilterValue,
            this.contacts
          );
        });
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
