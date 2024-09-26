import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './editContact.component.html',
  styleUrl: './editContact.component.scss',
  providers: [HttpClientModule, ContactsService],
})
export class EditContactComponent {
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {}
}
