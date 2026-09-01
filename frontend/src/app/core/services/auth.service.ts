import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'portfolio-admin-session';

  login(username: string, password: string): Observable<{ access_token: string; token_type: string }> {
    if (username === 'admin' && password === '2203hf') {
      const result = { access_token: 'local-session', token_type: 'local' };
      localStorage.setItem(this.tokenKey, result.access_token);
      return of(result);
    }
    return throwError(() => new Error('Identifiants incorrects'));
  }

  logout(): void { localStorage.removeItem(this.tokenKey); }
  getToken(): string | null { return localStorage.getItem(this.tokenKey); }
  isLoggedIn(): boolean { return !!this.getToken(); }
}
