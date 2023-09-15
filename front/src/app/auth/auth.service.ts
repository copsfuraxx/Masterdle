import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';
import {User} from "../user/user.model";
import {UserService} from "../user/user.service";
import {AuthRepository} from "./auth.repository";
import {Login} from "./auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userAuthentified: BehaviorSubject<User|null> = new BehaviorSubject<User | null>(null);

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private authRepository: AuthRepository,
  ) {
    let token = this.cookieService.get('accessToken');
    if (token) {
       this.userService.getUserFromToken(token).subscribe((user) => {
          this.userAuthentified.next(user);
       });
    }
  }

  login(dataLogin: Login){
    this.authRepository.login(dataLogin).subscribe(
      (data) => {
        this.cookieService.set('userName', data.userName, );
        this.cookieService.set('userRole', data.userRole);
        this.cookieService.set('accessToken', data.tokens.accessToken);
        this.cookieService.set('refreshToken', data.tokens.refreshToken);
        this.userAuthentified.next(
          {
            userName: data.userName,
            userRole : data.userRole
          });
      }
    )
  }

  get userAuthentified$() : Observable<User|null>{
    return this.userAuthentified.asObservable();
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.userAuthentified.next(null);
  }
}
