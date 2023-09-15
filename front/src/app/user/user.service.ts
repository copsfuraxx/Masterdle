import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./user.model";
import {UserRepository} from "./user.repository";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private userRepository: UserRepository,
  ) { }

  getUserFromToken(token: string):Observable<User>{
    return this.userRepository.getUserFromToken(token);
  }
}
