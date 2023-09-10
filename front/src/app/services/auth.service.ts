import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environement } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private isAuthenticated: boolean = false;

  login(username: string, passwrd: string): boolean {
    const loginData = { username, passwrd};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    });

    let result: boolean = false;

    this.http.post(`${environement.apiBaseUrl}auth/login`, loginData, { headers }).subscribe({
      next(data) {
        console.log(data);
      },
      error(data) {
        console.log(data.error);
      },
    });

    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
