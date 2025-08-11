import { Component } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../interfaces/ticket';
import { Response } from '../../../interfaces/response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from '../../../services/response.service';
@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css',
})
export class TicketDetailComponent {
  ticket: Ticket = {} as Ticket;
  responses: Response[] = [];
  message: string = '';
  id: number;
  error: string = '';
  loading: boolean = true;
  fetchingTickets: boolean = true;
  fetchingResponses: boolean = true;
  
  constructor(
    private ticketService: TicketService,
    activatedRoute: ActivatedRoute,
    private responseService: ResponseService
  ) {
    // Obtener el ID del ticket de la url
    this.id = activatedRoute.snapshot.params['id'];
    //this.ticket = this.ticketService.getTicketById(this.id);
    //this.responses = this.responseService.getResponsesByTicketId(this.id);
  }

  ngOnInit(): void {
    this.ticketService.getTicketById(this.id).subscribe({
      next: (response: any) => {
        this.ticket = response.data.length > 0 ? response.data[0] : ({} as Ticket);
        this.fetchingTickets = false;
        this.checkIfReady();
      },
      error: (err: any) => {
        console.error('Error al cargar el ticket:', err);
        this.error = 'Error al cargar el ticket';
        this.fetchingTickets = false;
        this.checkIfReady();
      },
    });

    this.responseService.getResponsesByTicketId(this.id).subscribe({
      next: (response: any) => {
        this.responses = response.data;
        this.fetchingResponses = false;
        this.checkIfReady();
      },
      error: (err: any) => {
        console.error('Error al cargar las respuestas:', err);
        this.fetchingResponses = false;
        this.checkIfReady();
      },
    });
  }

  submit(): void {
    if (this.message) {
      if (!this.message || this.message.trim().length < 10) {
        this.error = 'La respuesta debe tener al menos 10 caracteres.';
        return;
      }

      this.error = '';

      this.responseService.createResponse(this.message, this.id).subscribe({
        next: (response: any) => {
          this.responses.push(response);
        },
        error: (err: any) => {
          console.error('Error creating response:', err);
        },
      });
      
      this.responseService.getResponsesByTicketId(this.id).subscribe({
        next: (response: any) => {
          this.responses = response.data;
        },
        error: (err: any) => {
          console.error('Error fetching responses:', err);
          this.error = 'Error fetching responses';
        },
      });
      this.message = '';
    }
  }

  checkIfReady(): void {
    if (!this.fetchingTickets && !this.fetchingResponses) {
      this.loading = false;
    }
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
}