import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    const url = `${environment.apiUrl}/users/sign_in`

    return this.http.post(url, user)
  }

  register(user: User): Observable<any> {
    const url = `${environment.apiUrl}/users`

    return this.http.post(url, user)
  }

  logout(): Observable<any> {
    const url = `${environment.apiUrl}/users/sign_out`

    localStorage.clear()
    return this.http.delete(url)
  }

  updateUser(user: User): Observable<any> {
    const url = `${environment.apiUrl}/users`
    const updatedParams = { user };

    return this.http.put(url, updatedParams)
  }

  deleteAccount(user_id: number): Observable<any> {
    const url = `${environment.apiUrl}/users/${user_id}`

    return this.http.delete(url)
  }
}
