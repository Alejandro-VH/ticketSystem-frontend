import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
}
