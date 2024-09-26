import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-view-contact',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './viewContact.component.html',
  styleUrl: './viewContact.component.scss',
  providers: [ContactsService, HttpClientModule],
})
export class ViewContactComponent {
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {}
}
