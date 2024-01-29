import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthServiceService, private router: Router) { }

  onSubmit(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/a1']);
    } else {
      console.log('Credenciales incorrectas');
    }
  }
}
