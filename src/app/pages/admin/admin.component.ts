import { Component } from '@angular/core';
import { RegisterApiService } from '../../services/api/register-api.service';
import { Router } from '@angular/router';
import { UserDataModel } from '../../services/api/models/user-data-model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
  constructor(
    private register: RegisterApiService,
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
