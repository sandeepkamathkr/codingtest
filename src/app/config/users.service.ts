import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../shared/model/user.model";
import {HttpClient} from "@angular/common/http";

export interface IUsersService {
  findAllUsers(): Observable<User[]>;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUsersService {

  private userUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
  }

  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
}
