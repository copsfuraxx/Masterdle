import { Injectable } from '@angular/core';
import { environement } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  baseUrl = `${environement.apiBaseUrl}/user`;

  constructor(private http: HttpClient) { }

  getUserFromToken(token: string): Observable<User> {
    return this.http.get<any>(`${this.baseUrl}/get`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }});
  }
}
