import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // email: string='dani';
  // password: string='dani';

  constructor(public usuarioService: AuthServiceService, public router: Router,private toastr: ToastrService ) {}

  buscarUsuario(username: string, password: string): void {
    this.usuarioService.buscarUsuario(username, password)
      .subscribe(
        usuario => {
          console.log('Usuario encontrado:', usuario);
          this.router.navigate(['/a1'])

        },
        error => {
          console.error('Error al buscar usuario:', error);
          this.toastr.error('Credenciales inválidas', 'Error de inicio de sesión');
        }
      );
  }
}
