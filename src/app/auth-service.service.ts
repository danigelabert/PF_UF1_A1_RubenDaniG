import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  login(username: string, password: string): boolean {
    if (username === 'usuario' && password === 'contraseña') {
      return true;
    } else {
      return false;
    }
  }
  constructor() { }
}
