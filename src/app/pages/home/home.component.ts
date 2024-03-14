import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ChangeDetectorRef } from '@angular/core';
import { ForumApiService } from '../../services/api/forum-post-api.service';
import { ForumItemModel } from '../../services/api/models/forum-item-model';
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_USER_ID_KEY } from '../../constants';
import { RegisterApiService } from '../../services/api/register-api.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { Router } from '@angular/router';
import { UserDataModel } from '../../services/api/models/user-data-model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit  {

  @ViewChild('msgContainer')
  msgContainer!: ElementRef;

  messageInput: string = '';

  messages: Array<any> = [];

  signout_button: boolean = false;
  register_container: boolean = true;

  userId: any = null;
 
  userRole: any  = null;
  
  constructor(
    private service: HomeService,
    private cdr: ChangeDetectorRef,
    private router: Router, 
    private forumApiService: ForumApiService,
    private cdref: ChangeDetectorRef,
    private registerService: RegisterApiService,
    private jwtDecodeToken: JwtDecoderService
  ) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
 }
 decodetToken: any;

  ngOnInit(): void {
    
 

    //if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY);
      /* const userLocalId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);
      if (userLocalId) {
        this.userId = userLocalId;
      } */
      if (token) {
        this.signout_button = true;
        this.register_container = false;

        this.decodetToken = this.jwtDecodeToken.decodeToken(token);
        
        this.registerService.getUserByUsername(this.decodetToken.username)
        .subscribe({
          next: (res) => {
              this.userId = res.userId;
              this.userRole = res.role;
          }
        });
      } else {
        this.signout_button = false;
        this.register_container = true;
      }
     
    this.getAllPostApiRequest();
    //}
  }
 
  
  onSendClick(): void {
    this.createPostApiRequest(); 
  }

  //keyboard click listener
  onEnterKeyPressed() {
    this.createPostApiRequest();
  }
  /* get all post request */
  getAllPostApiRequest() {
    this.forumApiService.getAllPosts()
    .subscribe({
      next: (data) => {
        this.messages = data;
      }
    });
  }
  /* new post requst */
  createPostApiRequest() {
    if (!this.messageInput) {
      alert('the text field is empty');
      return
    }
    const sendingPost: ForumItemModel = {
      userId: this.userId,
      message: this.messageInput
    }
    this.forumApiService.createPost(sendingPost)
    .subscribe({
      next: (res) => {
        if (res) {
          this.getAllPostApiRequest();
          this.messageInput = '';
        }
      }
    });
  }
   //delete message
   deleteMessage(postId: number) {
    this.forumApiService.deletePostById(postId)
    .subscribe({
      next: () => {
        console.log("deleteMsgId: " + postId)
        this.getAllPostApiRequest();
      }
    }) 
  }
  //open commit
  openCommentPage(postId: number, postMessage: string) {
    this.router.navigate(['posts', postId], {
      queryParams: {postMsg: postMessage}
    })
  } 
}
