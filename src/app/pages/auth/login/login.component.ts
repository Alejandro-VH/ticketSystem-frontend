import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";
  showPasswords: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        if(err.status === 401) {
          this.error = "Correo o contraseña incorrectos";
        } else if (err.status === 403) {
          this.error = "Usuario no habilitado, contacte a administración";
        } else {
          this.error = "Error al iniciar sesión";
        }
      }
    });
  }

    togglePasswordsVisibility() {
    this.showPasswords = !this.showPasswords;
  }
}