import { Component } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css',
})
export class CreateTicketComponent {
  constructor(private ticketService: TicketService, private router: Router) {}

  title: string = '';
  description: string = '';
  priority: string = 'low';
  error: string = '';

  onSubmit() {
    this.ticketService.createTicket(this.title, this.description, this.priority).subscribe({
      next: (response: any) => {
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.error = 'Hubo un error al crear el ticket';
      }
    });
  }
}
