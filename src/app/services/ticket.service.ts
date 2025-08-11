import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  createTicket(title: string, description: string, priority: string) {
    const body = { title, description, priority };
    console.log("ticket service");
    return this.http.post(`${this.baseUrl}/tickets`, body);
  }

  updateTicket(id: number, body: any) {
    const url = `${this.baseUrl}/tickets/${id}`;
    return this.http.patch(url, body);
  }

  getMyTickets() {
    return this.http.get(`${this.baseUrl}/my-tickets`);
  }
  
  getMyTicketById(id: number) {
    return this.http.get(`${this.baseUrl}/tickets/my/${id}`);
  }

  getTicketById(id: number) {
    return this.http.get(`${this.baseUrl}/tickets/${id}`);
  }

  getTickets() {
    return this.http.get(`${this.baseUrl}/tickets`);
  }

  getTicketStats() {
    return this.http.get(`${this.baseUrl}/tickets/stats`);
  }
}
