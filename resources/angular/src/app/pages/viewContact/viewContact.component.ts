import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-contact',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  templateUrl: './viewContact.component.html',
  styleUrl: './viewContact.component.scss',
  providers: [ContactsService, HttpClientModule],
})
export class ViewContactComponent {
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
}
