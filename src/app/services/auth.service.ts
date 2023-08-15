import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'token';

  constructor() { }

  isAuth(): boolean {
    const auth_token = localStorage.getItem(this.token);

    return !!auth_token
  }
}
