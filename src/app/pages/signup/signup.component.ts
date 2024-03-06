import { Component } from '@angular/core';
import { ForumApiService } from '../../services/api/forum-post-api.service';
import { UserDataModel } from '../../services/api/models/user-data-model';
import { Router } from '@angular/router';
import { RegisterApiService } from '../../services/api/register-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private registerApiService: RegisterApiService,
    private router: Router
  ) {}
  
  onSubmit() : void {
    if (this.password === this.confirmPassword) {
      const newUser: UserDataModel = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
      }
      this.registerApiService.signUp(newUser)
      .subscribe({
        next: (result) => {
          if(result) {
            this.router.navigate(['home']);
          }
          console.log(`SignUp result: ${result}`);
        },
        error: error => {
          /* this.errorMessage = error.message; */
          console.error('There was an signUp error!', error);
      }
      });
    } else {
      console.log('Confirm password is incorrect');
      alert('Confirm password is incorrect');
    }
    console.log(this.firstName);
  }
  
}
