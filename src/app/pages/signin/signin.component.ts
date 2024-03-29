import { Component } from '@angular/core';
import { RegisterApiService } from '../../services/api/register-api.service';
import { Router } from '@angular/router';
import { UserDataModel } from '../../services/api/models/user-data-model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  
  constructor(private register: RegisterApiService,
    private router: Router) {}
  username: string = '';
  password: string = '';

  onSubmit(): void {
    const userData: UserDataModel = {
      username: this.username,
      password: this.password
    }
    this.register.logIn(userData)
    .subscribe({
      next: (res) => {
        this.router.navigate(['home']);
      },
      error: (error) => {
        alert('There was a signIn error!')
      }
    })
  }
}
