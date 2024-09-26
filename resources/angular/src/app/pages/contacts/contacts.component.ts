import { BehaviorSubject, Subscription } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import { Component, DoCheck } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { filterContacts } from './helpers/filterContacts';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    ButtonComponent,
    HttpClientModule,
    FormsModule,
    NgFor,
    NgIf,
    ScrollingModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  providers: [ContactsService, HttpClientModule],
})
export class ContactsComponent {
  isLoading: boolean = true;
  contacts: any[] = [];
  filteredContacts: any[] = [];

  private searchChangeTimeout: any = null;
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

    clearTimeout(this.searchChangeTimeout);

    this.searchChangeTimeout = setTimeout(() => {
      this.searchFilter.next(inputElement.value);
    }, 300);
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

        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  viewContact(contactId: number): void {
    this.router.navigate([`/viewContact/${contactId}`]);
  }
}
