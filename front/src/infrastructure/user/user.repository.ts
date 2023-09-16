import { Injectable } from '@angular/core';
import { environement } from "../../environments/environment";
import { Observable, of, switchMap} from "rxjs";
import { User } from "../../app/user/user.model";
import { HttpClient } from "@angular/common/http";

export interface UserDto {
  username: string;
  userRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  baseUrl = `${environement.apiBaseUrl}/user`;

  constructor(private http: HttpClient) { }

  getUserFromToken(token: string): Observable<User> {
    return this.http.get<UserDto>(`${this.baseUrl}/get`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }}).pipe(
      switchMap((userDto: UserDto): Observable<User> => {
            return of(UserMapper.toModel(userDto));
          })
      )
  }


}


export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      username: user.userName,
      userRole: user.userRole,
    }
  }

  static toModel(userDto: UserDto): User {
    return {
      userName: userDto.username,
      userRole: userDto.userRole,
    }
  }
}
