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
    this.checkInputLarge();
    if (this.error) {
      return;
    }
    this.ticketService
      .createTicket(this.title, this.description, this.priority)
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          this.error = 'Hubo un error al crear el ticket';
        },
      });
  }

  checkInputLarge() {
    if (this.title.trim().length < 3) {
      this.error = 'El título debe tener al menos 3 caracteres';
      return;
    }

    if (this.description.trim().length < 5) {
      this.error = 'La descripción debe tener al menos 5 caracteres';
      return;
    }

    if (this.title.trim().length > 70) {
      this.error = 'El título debe tener como máximo 70 caracteres';
      return;
    }

    if (this.description.trim().length > 1000) {
      this.error = 'La descripción debe tener como máximo 1000 caracteres';
      return;
    }
    this.error = '';
  }
}
