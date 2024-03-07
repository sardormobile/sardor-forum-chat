import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ChangeDetectorRef } from '@angular/core';
import { ForumApiService } from '../../services/api/forum-post-api.service';
import { ForumItemModel } from '../../services/api/models/forum-item-model';
import { Router } from '@angular/router';

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

  constructor(
    private service: HomeService,
    private cdr: ChangeDetectorRef,
    private forumApiService: ForumApiService,
    private router: Router, private cdref: ChangeDetectorRef 
  ) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
 }

  ngOnInit(): void {
    this.messages = [];
    this.getAllPostApiRequest();
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
    return this.forumApiService.getAllPosts()
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
      userId: 302,
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
        this.getAllPostApiRequest();
      }
    }) 
  }
  //open commit
  openCommentPage(postId: number) {
    this.router.navigate(['comment', postId])
  } 
}
