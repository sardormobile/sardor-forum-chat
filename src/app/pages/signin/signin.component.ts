import { Component } from '@angular/core';
import { RegisterApiService } from '../../services/api/register-api.service';
import { Router } from '@angular/router';
import { UserDataModel } from '../../services/api/models/user-data-model';
import { ForumApiService } from '../../services/api/forum-post-api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  
  constructor(
    private register: RegisterApiService,
    private router: Router,
    private forumApiService: ForumApiService,
    ) {}
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
        if (res) {
          this.loadNavBarItems();
        }
        console.log('LogIn successful:', res);
      },
      error: (error) => {
        alert('There was a signIn error!')
      }
    })
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
}
