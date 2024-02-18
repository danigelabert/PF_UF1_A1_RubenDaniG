import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  buscarUsuario(username: string, password: string): Observable<any> {
    const data = { username, password };
    console.log('Datos enviados:', data); // Verifica si los datos son correctos
    return this.http.post<any>('http://localhost:3000/api/usuario', data);
  }

  login(usuario: string, contra: string): Observable<any> {
    const data = { usuario, contra };
    return this.http.post<any>('http://localhost:3000/login', data);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
  getUser() {
    return this.http.get("https://reqres.in/api/users/2");
  }
  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }
}
