import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-support-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './support-dashboard.component.html',
  styleUrl: './support-dashboard.component.css',
})
export class SupportDashboardComponent {
  constructor(private router: Router, private ticketService: TicketService) {}
  loading: boolean = true;
  tickets: any[] = [];
  totalTickets: number = 0;
  pendingTickets: number = 0;
  inProgressTickets: number = 0;
  resolvedTickets: number = 0;
  userName: string = '';
  ngOnInit() {
    this.loadTickets();
    this.loadTicketStats();
    this.getUserName();
  }

  loadTickets() {
    this.loading = true;
    this.ticketService.getTickets().subscribe({
      next: (tickets: any) => {
        this.tickets = tickets.data[0] || [];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }

  loadTicketStats() {
    this.loading = true;
    this.ticketService.getTicketStats().subscribe({
      next: (stats: any) => {
        this.totalTickets = stats.data.total || 0;
        this.pendingTickets = stats.data.pending || 0;
        this.inProgressTickets = stats.data.in_progress || 0;
        this.resolvedTickets = stats.data.resolved || 0;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'open':
        return 'Abierto';
      case 'in_progress':
        return 'En progreso';
      case 'closed':
        return 'Cerrado';
      default:
        return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'open':
        return 'border-green-500 text-green-700 bg-green-100';
      case 'in_progress':
        return 'border-yellow-500 text-yellow-700 bg-yellow-100';
      case 'closed':
        return 'border-red-500 text-red-700 bg-red-100';
      default:
        return '';
    }
  }

  getPriorityText(priority: string): string {
    switch (priority) {
      case 'low':
        return 'Baja';
      case 'medium':
        return 'Media';
      case 'high':
        return 'Alta';
      default:
        return priority;
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
