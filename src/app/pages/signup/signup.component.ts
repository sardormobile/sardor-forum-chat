import { Component } from '@angular/core';
import { ForumApiService } from '../../services/api/forum-post-api.service';
import { UserDataModel } from '../../services/api/models/user-data-model';
import { Router } from '@angular/router';
import { RegisterApiService } from '../../services/api/register-api.service';
import { TopNavBarModel } from '../../services/api/models/TopNavBarModel';
import { Location } from '@angular/common';

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
    private forumApiService: ForumApiService,
    private router: Router,
    private location: Location,
  ) {}
  onSubmit(): void {
    // Check if any of the fields are empty
    if (!this.username || !this.firstName || !this.lastName || !this.password || !this.confirmPassword) {
      console.log('All fields are required');
      alert('All fields are required');
      return;
    }
  
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      console.log('Confirm password is incorrect');
      alert('Confirm password is incorrect');
      return;
    }
  
    // If all fields are filled and passwords match, proceed with sign up
    const newUser: UserDataModel = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
    };
  
    this.registerApiService.signUp(newUser)
      .subscribe({
        next: (res) => {
          if (res) {
            this.loadNavBarItems();
          }
          console.log('SignUp successful:', res);
        },
        error: (error) => {
          console.error('SignUp error:', error);
        }
      });
  }
  loadNavBarItems() {
    this.forumApiService.getNavBarItems()
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            const { topic, topicId } = data[0];
            this.navigateToHome(topic, topicId);
          }
        },
        error: (error) => {
          console.error('Error fetching navigation bar items:', error);
        }
      });
    }
    navigateToHome(title: string, titleId: number) {
      this.router.navigate(['/home', title], { queryParams: { title, titleId } });
    }
    goBack() {
      this.location.back();
    }
}
