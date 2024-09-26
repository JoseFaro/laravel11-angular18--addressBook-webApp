import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './createContact.component.html',
  styleUrl: './createContact.component.scss',
  providers: [ContactsService, HttpClientModule],
})
export class CreateContactComponent {
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {}
}
