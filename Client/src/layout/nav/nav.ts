import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/service/account-service';
import { Result } from 'postcss';
import { single } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/service/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountservice = inject(AccountService);
  private toast = inject(ToastService);
  protected router = inject(Router);
  protected creds: any = {}
  protected loggedIn = signal(false)

  login()
  {
    this.accountservice.login(this.creds).subscribe(
      {
        next: result => {
          this.router.navigateByUrl('/members');
          this.toast.success('Logged in successfully');
          this.loggedIn.set(true);    
        },
        error: error => this.toast.error(error.error)
      })
  }
  logout()
  {
    this.router.navigateByUrl('/');
    this.accountservice.logout();
  }
}
