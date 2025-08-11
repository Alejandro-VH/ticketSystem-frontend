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
  email: string = '';
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
        this.email = user.data[0].email;
        this.role_id = user.data[0].role_id;
        this.status = user.data[0].is_enabled;
        this.loading = false;
      },
      error: (err) => (this.error = err),
    });

  }

  onSubmit() {
    this.userService.updateUser(this.id, { name: this.name, email: this.email, role_id: this.role_id, is_enabled: this.status }).subscribe({
        next: (res: any) =>{
          console.log('Usuario actualizado con éxito:', res);
          this.router.navigate(['/home']);
        },
        error: (err) => (this.error = err),
      });
  }
}
