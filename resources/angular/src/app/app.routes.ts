import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { CreateContactComponent } from './contacts/createContact/createContact.component';
import { ViewContactComponent } from './contacts/viewContact/viewContact.component';
import { EditContactComponent } from './contacts/editContact/editContact.component';

export const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'createContact', component: CreateContactComponent },
  { path: 'viewContact/:id', component: ViewContactComponent },
  { path: 'editContact/:id', component: EditContactComponent },
  { path: '**', redirectTo: '' },
];
