import { Injectable } from '@angular/core';
import {environement} from "../../environments/environment";
import {headers} from "../globals";
import {HttpClient} from "@angular/common/http";
import {Login} from "./auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {

  baseUrl: string = `${environement.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
  ) {}

  login(loginData:Login) {
    return this.http.post<any>(`${this.baseUrl}/login`, loginData, { headers });
  }
}
