import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  getContacts(): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/contacts';
    return this.http.get<any>(url);
  }
}
