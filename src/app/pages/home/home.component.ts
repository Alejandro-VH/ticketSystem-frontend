import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { UserHomeComponent } from '../user/user-home/user-home.component';
import { SupportDashboardComponent } from '../support/support-dashboard/support-dashboard.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AdminDashboardComponent,
    SupportDashboardComponent,
    UserHomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  role_id: number = 0;
  user: any;
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    this.getRole();
  }

  getRole() {
    this.role_id = this.user.role_id;
  }
}
