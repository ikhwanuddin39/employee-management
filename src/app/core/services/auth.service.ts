import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly VALID_CREDENTIALS = { username: 'admin', password: 'admin123' };
  private readonly SESSION_KEY = 'AUTH_SESSION';

  isLoggedIn = signal<boolean>(!!sessionStorage.getItem(this.SESSION_KEY));

  login(username: string, password: string): boolean {
    if (username === this.VALID_CREDENTIALS.username && password === this.VALID_CREDENTIALS.password) {
      sessionStorage.setItem(this.SESSION_KEY, 'true');
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.isLoggedIn.set(false);
  }
}
