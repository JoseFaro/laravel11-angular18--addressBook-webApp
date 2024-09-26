import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private basePath: string = 'http://127.0.0.1:8000/api/contacts';

  constructor(private http: HttpClient) {}

  getContact(id: number): Observable<any> {
    const url = `${this.basePath}/show/${id}`;
    return this.http.get<any>(url);
  }

  getContacts(): Observable<any> {
    const url = `${this.basePath}`;
    return this.http.get<any>(url);
  }

  deleteContact(id: number): Observable<any> {
    const url = `${this.basePath}/destroy`;
    return this.http.post<any>(url, { id });
  }

  storeContact(contact: any): Observable<any> {
    const url = `${this.basePath}/store`;
    return this.http.post<any>(url, contact);
  }

  updateContact(contact: any): Observable<any> {
    const url = `${this.basePath}/update/${contact.id}`;
    return this.http.post<any>(url, contact);
  }
}
