import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterApiService } from '../../../services/api/register-api.service';

import { LOCAL_STORAGE_KEY } from '../../../constants';
import { JwtDecoderService } from '../../../services/jwt-decoder.service';
import { UserDataModel } from '../../../services/api/models/user-data-model';

@Component({
  selector: 'app-home-router',
  templateUrl: './home-router.component.html',
  styleUrl: './home-router.component.css'
})
export class HomeRouterComponent {
  constructor(
    private router: Router, 
    private registerService: RegisterApiService,
    private jwtDecodeToken: JwtDecoderService
  ) {}
  
 decodetToken: any;

 userId: number = 0;
 name: string = ''
 username: string = ''
 signout_button: boolean = false;
 register_container = false;
 userRole: any = null;


 ngOnInit(): void {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
      
    if (token) {
      this.signout_button = true;
      this.register_container = false;
      this.decodetToken = this.jwtDecodeToken.decodeToken(token);
    } else {
      this.signout_button = false;
      this.register_container = true;
    }

    this.registerService.getUserByUsername(this.decodetToken.username)
      .subscribe({
        next: (res) => {
          if (res.username && res.userId && res.firstName) {
            this.name = `${res.firstName}`;
            this.username = res.username;
            this.userId = res.userId;
            this.userRole = res.role;
          }
        }
      });
  }
}

  signInClick() {
    this.router.navigate(['register/signin'])
  }
  signUpClick() {
    this.router.navigate(['register/signup'])
  }
  logOutClick() {
    this.registerService.logOut();
    this.router.navigate(['register/signin']);
  }
}
