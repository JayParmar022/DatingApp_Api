import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/service/account-service';
import { Result } from 'postcss';
import { single } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountservice = inject(AccountService)
  protected creds: any = {}
  protected loggedIn = signal(false)

  login()
  {
    this.accountservice.login(this.creds).subscribe(
      {
        next: result => {
          console.log(result);
          this.loggedIn.set(true);    

        },
        error: error => alert(error.message)
      })
  }
  logout()
  {
    this.accountservice.logout();
  }
}
