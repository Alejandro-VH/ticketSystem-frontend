import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  register(name: string, email: string, password: string, password_confirmation: string) {
    const body = { name, email, password, password_confirmation };
    return this.http.post(`${this.baseUrl}/register`, body);
  }

  logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}
