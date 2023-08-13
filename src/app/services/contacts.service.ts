import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<any> {
    const url = `${environment.apiUrl}/contacts`

    return this.http.get(url)
  }

  deleteContact(contactId: number): Observable<any> {
    const url = `${environment.apiUrl}/contacts/${contactId}`

    return this.http.delete(url)
  }
}
