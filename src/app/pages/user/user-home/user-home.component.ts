import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../interfaces/ticket';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent {
  constructor(private router: Router, private ticketService: TicketService) {}
  loading: boolean = true;
  tickets: Ticket[] = [];
  userName: string = '';

  ngOnInit(): void {
    this.getUserName();
    this.ticketService.getMyTickets().subscribe({
      next: (tickets: any) => {
        this.tickets = tickets.data[0] || [];
        console.log('Tickets fetched successfully:', tickets);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  createTicket() {
    this.router.navigate(['/user/create-ticket']);
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
