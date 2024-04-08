import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterApiService } from '../../../services/api/register-api.service';

import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_USER_DATA_KEY } from '../../../constants';
import { JwtDecoderService } from '../../../services/jwt-decoder.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TopBarDialogComponent } from '../../../dialog/top-bar-dialog/top-bar-dialog.component';
import { ForumApiService } from '../../../services/api/forum-post-api.service';
import { TopNavBarModel } from '../../../services/api/models/TopNavBarModel';
import { UserDataModel } from '../../../services/api/models/user-data-model';

@Component({
  selector: 'app-home-router',
  templateUrl: './home-router.component.html',
  styleUrl: './home-router.component.css',
})
export class HomeRouterComponent {
  constructor(
    private router: Router, 
    private registerService: RegisterApiService,
    private forumApiService: ForumApiService,
    private jwtDecodeToken: JwtDecoderService,
    public dialog: MatDialog
  ) {}
  
 decodetToken: any;

 userId?: number = 0;
 name?: string = ''
 username?: string = ''
 signout_button: boolean = false;
 register_container = false;
 userRole: any = null;
 
 /* topBarItemData: TopBarItemModel = {
   title: "2",
   isDelete: false
 }; */
 navItems: Array<TopNavBarModel> = [];

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

    const userDataString  = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
      if (userDataString !== null) {
        const userData: UserDataModel = JSON.parse(userDataString);
        this.name = `${userData.firstName}`;
        this.username = userData.username;
        this.userId = userData.userId;
        this.userRole = userData.role;
      }
    /* this.registerService.getUserByUsername(this.decodetToken.username)
      .subscribe({
        next: (res) => {
          if (res.username && res.userId && res.firstName) {
            this.name = `${res.firstName}`;
            this.username = res.username;
            this.userId = res.userId;
            this.userRole = res.role;
          }
        }
      }); */
  }
  this.initNavBarItems();
}

  signInClick() {
    this.router.navigate(['register/signin'])
  }
  logOutClick() {
    this.registerService.logOut();
    this.router.navigate(['register/signin']);
  }
  deleteItem(titleId: Number) {
    this.forumApiService.deleteNavBarItemByIndex(titleId)
    .subscribe({
      next: (res) => {
        this.initNavBarItems();
      },
      error(err) {
        console.error('Error deleting item:', err);
      },
    });
  }
  title: string = '';
  titleId: number = -1;
  activeTabIndex: number = 0;
  onTabClick(i: number) {
    //location.reload();
    this.activeTabIndex = i;
    this.title = this.navItems[i].topic;
    this.titleId = this.navItems[i].topicId;
    this.router.navigate([`/home`, this.title], { queryParams: { title: this.title, titleId: this.titleId } });
  }
  openDialog(): void {
    let foo = prompt('Type here');
    if (foo) {
      this.forumApiService.insertNavBarItem(foo)
      .subscribe({
        next: (data) => {
          this.navItems = data;
        }
      })
    }
    //let bar = confirm('Confirm or deny');
    console.log(foo);
  }
  initNavBarItems() {
    this.forumApiService.getNavBarItems()
    .subscribe({
      next: (data) => {
        this.navItems = data;
      }
    })
  }
  isDelete: boolean = false;
  showNavItemDelete() {
    this.isDelete = !this.isDelete;
  }
}
