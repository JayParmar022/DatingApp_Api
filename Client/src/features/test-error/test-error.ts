import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-error',
  imports: [],
  templateUrl: './test-error.html',
  styleUrl: './test-error.css'
})
export class TestError {

  private http = inject(HttpClient);
  baseUlr = 'https://localhost:5278/api/';
  validationError = signal<string[]>([]);

  get404Error(){
    this.http.get(this.baseUlr + 'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400Error(){
    this.http.get(this.baseUlr + 'buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get500Error(){
    this.http.get(this.baseUlr + 'buggy/server-request').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get401Error(){
    this.http.get(this.baseUlr + 'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400ValidationError(){
    this.http.post(this.baseUlr + 'account/register', {}).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error)
        this.validationError.set(error);
      }
    })
  }

}
