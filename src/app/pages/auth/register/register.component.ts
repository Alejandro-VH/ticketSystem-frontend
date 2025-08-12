import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
  error: string = "";
  password_matched: boolean = false;
  showPasswords: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    this.checkInputLarge();

    if (this.error) {
      return;
    }

    if (this.password !== this.password_confirmation) {
      this.error = "Las contraseñas no coinciden";
      this.password_matched = false;
      return;
    } else {
      this.password_matched = true;
    }

    this.authService.register(this.name, this.email, this.password, this.password_confirmation).subscribe({
      next: (response: any) => {
        this.error = "";
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error(err);
        this.error = "Error al registrar usuario";
      }
    });
  }

  togglePasswordsVisibility() {
    this.showPasswords = !this.showPasswords;
  }

  checkInputLarge() {
    if (this.name.length < 3) {
      this.error = 'El nombre debe tener al menos 3 caracteres';
      return;
    }

    if (this.password.length < 8) {
      this.error = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    if (this.name.length > 30) {
      this.error = 'El nombre debe tener como máximo 30 caracteres';
      return;
    }

    if (this.password.length > 20) {
      this.error = 'La contraseña debe tener como máximo 20 caracteres';
      return;
    }
    this.error = '';
  }
}
