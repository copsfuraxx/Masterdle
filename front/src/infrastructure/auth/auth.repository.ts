import { Injectable } from '@angular/core';
import {environement} from "../../environments/environment";
import {headers} from "../../app/globals";
import {HttpClient} from "@angular/common/http";
import {Login} from "../../app/auth/auth.model";

export interface LoginDto {
  username: string;
  passwrd: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {

  baseUrl: string = `${environement.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
  ) {}

  login(loginData:Login) {
    let dto: LoginDto = AuthMapper.toDto(loginData);
    return this.http.post<any>(`${this.baseUrl}/login`, dto, { headers });
  }
}

export class AuthMapper {
  static toDto(login: Login): LoginDto {
    return {
      username: login.userName,
      passwrd: login.password,
    }
  }

  static toModel(loginDto: LoginDto): Login {
    return {
      userName: loginDto.username,
      password: loginDto.passwrd,
    }
  }
}
