import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ChangeDetectorRef } from '@angular/core';
import { ForumApiService } from '../../services/api/forum-post-api.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { ForumItemModel } from '../../services/api/models/forum-item-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  messageInput: string = '';

  messages: Array<any> = [];

  constructor(
    private service: HomeService,
    private cdr: ChangeDetectorRef,
    private forumApiService: ForumApiService
  ) {
    this.messages = [];
    /* this.scrollToBottom(); */
  }
  ngOnInit(): void {
    this.forumApiService.getAllPosts()
    .subscribe({
      next: (data) => {
        this.messages = data;
        console.log(data);
      }
    });
  }
  
  onSendClick(): void {
    const sendingPost: ForumItemModel = {
      userId: 302,
      message: this.messageInput
    }
    this.forumApiService.createPost(sendingPost)
    .subscribe({
      next: (res) => {
        this.scrollToBottom();
      }
    });
    /* this.messages.push({
      userId: 302,
      message: this.messageInput,
    })
    this.scrollToBottom(); */
  }

  //keyboard click listener
  onEnterKeyPressed() {
    this.messages.push({
      "username": "john.hanios@gmail.com",
      "message": this.messageInput,
    })
    console.log(this.messageInput);
    this.scrollToBottom();
  }
  //delete message
  deleteMessage(postId: number): void {
    console.log("delete postId: " + postId);
    this.forumApiService.deletePstById(postId)
    .subscribe({
      next: (res) => {
        this.scrollToBottom();
        console.log(res);
      }
    }) 
    /* this.service.deleteMessage(index);
    this.cdr.detectChanges(); */
  }

  //scroll to bottom
  scrollToBottom(): void {
    var container = document.getElementById("msgContainer");
   if (container) {
    // Scroll to the bottom of the container
    container.scrollTop = container.scrollHeight; 
    // Manually trigger change detection
    this.cdr.detectChanges();
  } else {
    console.error("Message container element not found");
  }
  }
   
}
