import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  id: number;
  name: string = '';
  role_id: number = 0;
  status: number = 0;
  error: string = '';
  loading: boolean = true;
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.userService.getUser(this.id).subscribe({
      next: (user: any) => {
        this.name = user.data[0].name;
        this.role_id = user.data[0].role_id;
        this.status = user.data[0].is_enabled;
        this.loading = false;
      },
      error: (err) => (this.error = err),
    });

  }

  onSubmit() {
    this.checkInputLarge();

    if (this.error) {
      return;
    }

    this.userService.updateUser(this.id, { name: this.name, role_id: this.role_id, is_enabled: this.status }).subscribe({
        next: (res: any) =>{
          console.log('Usuario actualizado con éxito:', res);
          this.router.navigate(['/home']);
        },
        error: (err) => (this.error = err),
      });
  }

    checkInputLarge() {
    if (this.name.length < 3) {
      this.error = 'El nombre debe tener al menos 3 caracteres';
      return;
    }

    if (this.name.length > 70) {
      this.error = 'El nombre debe tener como máximo 70 caracteres';
      return;
    }

    this.error = '';
  }
}
