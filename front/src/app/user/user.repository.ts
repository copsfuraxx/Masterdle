import { Injectable } from '@angular/core';
import {environement} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  baseUrl = `${environement.apiBaseUrl}/user`;

  constructor() { }

  getUserFromToken(token: string): Observable<User> {
    return of({userName: 'test', userRole: 'admin'})
  }
}
