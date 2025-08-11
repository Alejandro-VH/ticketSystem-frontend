import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  getUsers() {
    const url = `${this.baseUrl}/users`;
    return this.http.get(url);
  }

  getUserStats() {
    const url = `${this.baseUrl}/users/stats`;
    return this.http.get(url);
  }

  getUser(id: number) {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get(url);
  }

  toggleStatus(id: number) {
    const url = `${this.baseUrl}/users/${id}/status`;
    return this.http.patch(url, {});
  }

  updateUser(id: number, body: any) {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.patch(url, body);
  }

}