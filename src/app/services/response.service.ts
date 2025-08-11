import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  createResponse(message: string, id: number) {
    const body = { ticket_id: id, message };
    return this.http.post(`${this.baseUrl}/tickets/${id}/responses`, body);
  }

  getResponsesByTicketId(id: number) {
    return this.http.get(`${this.baseUrl}/tickets/${id}/responses`);
  }
}
