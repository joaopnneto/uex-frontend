import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {
  constructor(private http: HttpClient) { }

 private getHeaders(): HttpHeaders {
  const authToken = localStorage['token'];
  return new HttpHeaders({
    'Authorization': `Bearer ${authToken}`
  });
}

  getAllContacts(): Observable<any> {
    const url = `${environment.apiUrl}/contacts`
    const headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  getContact(contactId: number): Observable<any> {
    const url = `${environment.apiUrl}/contacts/${contactId}`

    return this.http.get(url);
  }

  deleteContact(contactId: number): Observable<any> {
    const url = `${environment.apiUrl}/contacts/${contactId}`

    return this.http.delete(url);
  }

  createContact(contact: Contact): Observable<any> {
    const url = `${environment.apiUrl}/contacts`
    const headers = this.getHeaders();

    return this.http.post(url, contact, { headers });
  }

  updateContact(contact: Contact): Observable<any> {
    const url = `${environment.apiUrl}/contacts/${contact.id}`

    return this.http.put(url, contact);
  }

  viacepApi(zip_code: string): Observable<any> {
    const url = `${environment.apiUrl}/search-address/${zip_code}`

    return this.http.get(url);
  }

  textSearch(street: string): Observable<any>{
    const url = `${environment.apiUrl}/search-text/${street}`

    return this.http.get(url);
  }
}
