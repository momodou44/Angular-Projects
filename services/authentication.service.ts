import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UUID } from 'angular2-uuid';
import { throwError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users! : User[]
  constructor() { 
    this.users.push(
      {userId : UUID.UUID(), username:"user1",password:"1234",roles:["USER"]},
      {userId : UUID.UUID(), username:"user2",password:"1234",roles:["USER"]},
      {userId : UUID.UUID(), username:"admin",password:"1234",roles:["USER","ADMIN"]},
    )
  }

  public login(username : string, password : string): Observable<User>{
    let user = this.users.find(u => u.username == username);
    if(!user) throwError(()=> Error("User Not found"));
    if(user?.password != password) throwError(()=> Error("Bad Credentials"));
    return of(user)
  }

}
