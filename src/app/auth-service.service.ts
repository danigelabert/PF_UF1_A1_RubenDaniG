import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private apiUrl = "http://localhost:3000/api/usuario";
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  buscarUsuario(username: string, password: string): Observable<any> {
    const data = { username, password };
    console.log("Datos enviados:", data);
    return this.http.post<any>('http://localhost:3000/login', data);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getUser() {
    return this.http.get("https://reqres.in/api/users/2");
  }
}
