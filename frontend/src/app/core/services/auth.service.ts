import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../api-base';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'portfolio-admin-token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ access_token: string; token_type: string }> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post<{ access_token: string; token_type: string }>(`${API_BASE_URL}/api/auth/login`, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(tap((res) => localStorage.setItem(this.tokenKey, res.access_token)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
