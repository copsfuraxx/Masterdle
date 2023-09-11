import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environement } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service'
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, passwrd: string): Observable<any> {
    const loginData = { username, passwrd};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    });

    return this.http.post<any>(`${environement.apiBaseUrl}auth/login`, loginData, { headers }).pipe(
      tap(data => {
        this.cookieService.set('userName', data.userName, );
        this.cookieService.set('userRole', data.userRole);
        this.cookieService.set('accessToken', data.tokens.accessToken);
        this.cookieService.set('refreshToken', data.tokens.refreshToken);
      })
    );
  }

  logout(): void {
  }

  isAuthenticatedUser(): boolean {
    return this.cookieService.check('accessToken');
  }
}
