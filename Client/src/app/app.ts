import { Component, inject} from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { Router, RouterOutlet } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusyService } from '../core/service/busy-service';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(public busyService: BusyService) {}
 // protected accountService = inject(AccountService);
  protected router = inject(Router);

  // private http = inject(HttpClient);
  // protected title = 'Dating App';
  // protected members = signal<User[]>([]);

  // async ngOnInit() {
  //   this.members.set( await this.getmembers());
  //   this.setCurrentUser();
  // }

  // setCurrentUser(){
  //   const userString = localStorage.getItem('user');
  //   if(!userString) return;
  //   const user = JSON.parse(userString);
  //   this.accountService.currentUser.set(user);
  // }
  // getmembers(){
  //     try{
  //       return lastValueFrom(this.http.get<User[]>('https://localhost:5278/api/members'));
  //     }catch (error){
  //       console.log(error);
  //       throw error;
  //     }
  // }

  // trackByIndex(index: number, member: any): number {
  //   return index;
  // }

}
