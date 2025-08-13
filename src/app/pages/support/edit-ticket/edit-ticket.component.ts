import { Component } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../../interfaces/ticket';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.css',
})
export class EditTicketComponent {
  id: number;
  title: string = '';
  description: string = '';
  priority: string = 'low';
  status: string = 'open';
  error: string = '';
  loading: boolean = true;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.ticketService.getTicketById(this.id).subscribe({
      next: (ticket: any) => {
        this.title = ticket.data[0].title;
        this.description = ticket.data[0].description;
        this.priority = ticket.data[0].priority;
        this.status = ticket.data[0].status;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar el ticket:', err);
        this.error = 'Error al cargar el ticket';
      },
    });
  }

  onSubmit() {
    this.checkInputLarge();

    if (this.error) {
      return;
    }

    this.ticketService
      .updateTicket(this.id, {
        title: this.title,
        description: this.description,
        priority: this.priority,
        status: this.status,
      })
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => (this.error = err),
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

    if (this.title.trim().length > 60) {
      this.error = 'El título debe tener como máximo 60 caracteres';
      return;
    }

    if (this.description.trim().length > 1000) {
      this.error = 'La descripción debe tener como máximo 1000 caracteres';
      return;
    }
    this.error = '';
  }
}
