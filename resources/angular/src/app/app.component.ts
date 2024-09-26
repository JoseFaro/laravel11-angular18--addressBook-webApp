import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { LayoutComponent } from './components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactsComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular';
}
