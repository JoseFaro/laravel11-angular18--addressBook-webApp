import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private basePath: string = 'http://127.0.0.1:8000/api/contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any> {
    const url = `${this.basePath}`;
    return this.http.get<any>(url);
  }

  deleteContact(id: number): Observable<any> {
    const url = `${this.basePath}/contacts/destroy`;
    return this.http.post<any>(url, { id });
  }
}
