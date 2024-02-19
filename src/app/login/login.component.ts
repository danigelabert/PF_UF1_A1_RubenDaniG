import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public usuarioService: AuthServiceService, public router: Router,private toastr: ToastrService ) {}

  buscarUsuario(username: string, password: string): void {
    this.usuarioService.buscarUsuario(username, password)
      .subscribe(
        () => {
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/a1']);
        },
        error => {
          console.log('Error al buscar usuario:', error);
          this.toastr.error('Credenciales inválidas', 'Error de inicio de sesión');
        }
      );
  }
}
