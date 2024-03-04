import { Component } from '@angular/core';
import { ForumApiService } from '../../services/api/forum-api.service';
import { UserDataModel } from '../../services/api/models/user-data-model';

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
    private forumApiService: ForumApiService
  ) {}
  
  onSubmit() : void {
    if (this.password === this.confirmPassword) {
      const newUser: UserDataModel = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
      }
      this.forumApiService.signUp(newUser)
      .subscribe({
        next: (result) => {
          console.log(`SignUp result: ${result}`);
        }
      });
    } else {
      console.log('Confirm password is incorrect');
      alert('Confirm password is incorrect');
    }
    console.log(this.firstName);
  }
  
}
