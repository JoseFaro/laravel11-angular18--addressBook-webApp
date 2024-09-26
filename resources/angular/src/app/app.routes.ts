import { Routes } from '@angular/router';

import { ContactsComponent } from './pages/contacts/contacts.component';
import { CreateContactComponent } from './pages/createContact/createContact.component';
import { EditContactComponent } from './pages/editContact/editContact.component';
import { ViewContactComponent } from './pages/viewContact/viewContact.component';

export const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'createContact', component: CreateContactComponent },
  { path: 'viewContact/:id', component: ViewContactComponent },
  { path: 'editContact/:id', component: EditContactComponent },
  { path: '**', redirectTo: '' },
];
