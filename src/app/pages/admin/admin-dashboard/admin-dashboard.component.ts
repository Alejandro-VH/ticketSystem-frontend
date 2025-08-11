import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(private userService: UserService) {}

  loading: boolean = true;
  totalUsers: number = 0;
  supportCount: number = 0;
  adminCount: number = 0;
  userCount: number = 0;
  users: any[] = [];
  userName: string = '';

  ngOnInit(): void {
    this.loadUserStats();
    this.loadUsers();
    this.getUserName();
  }

  loadUsers() {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (users: any) => {
        console.log('Users fetched successfully:', users);
        this.users = users.data[0] || [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  loadUserStats() {
    this.loading = true;

    this.userService.getUserStats().subscribe({
      next: (stats: any) => {
        this.totalUsers = stats.data.total;
        this.supportCount = stats.data.supports;
        this.adminCount = stats.data.admins;
        this.userCount = stats.data.users;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar estadísticas:', err);
      }
    });
  }

  toggleUserEnabled(user: any) {
    this.userService.toggleStatus(user.id).subscribe({
      next: () => {
        user.is_enabled = !user.is_enabled;
      },
      error: (err) => {
        console.error('Error al cambiar estado de usuario:', err);
      }
    });
  }

    getRoleText(role: number): string {
    switch (role) {
      case 3:
        return 'Usuario';
      case 2:
        return 'Soporte';
      case 1:
        return 'Administrador';
      default:
        return 'Desconocido';
    }
  }

    getUserName() {
    const userData = localStorage.getItem('user');

    if (!userData) {
      this.userName = '';
      return;
    }

    try {
      const user = JSON.parse(userData);
      this.userName = user.name || '';
    } catch (error) {
      this.userName = '';
    }
  }
}
