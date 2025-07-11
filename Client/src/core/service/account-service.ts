import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  baseUlr = 'https://localhost:5278/api/';

  register(creds: RegisterCreds){
    return this.http.post<User>(this.baseUlr + 'account/register',creds).pipe(
      tap(user => {
        if(user){
         this.setCurrentUser(user)
        }
      })
    )
  }

  login(creds: LoginCreds){
    return this.http.post<User>(this.baseUlr + 'account/login', creds).pipe(
      tap(user => {
        if(user){
         this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user : User){
    localStorage.setItem('user',JSON.stringify(user))
    this.currentUser.set(user)
  }
  
  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
  
}
