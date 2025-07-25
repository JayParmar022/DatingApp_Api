import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/service/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

 // membersFromHome = input.required<User[]>();
  private accountservice = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds

  register()
  {
    this.accountservice.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    })
  }
  
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
