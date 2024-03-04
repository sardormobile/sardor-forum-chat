import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ChangeDetectorRef } from '@angular/core';
import { ForumApiService } from '../../services/api/forum-api.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

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
    this.messages = service.getAllMessages();
    /* this.scrollToBottom(); */
  }
  ngOnInit(): void {
    this.forumApiService.getAllForumContent()
    .subscribe({
      next: (data) => {
        console.log(data);
      },
      /* error: (error: HttpErrorResponse) => {
        if (error instanceof ErrorEvent) {
          console.error(`An error occured:${error.message}`);
        } else {
          console.log(`Server returned status code ${error.status}, error message: ${error.message}`);
        }
      } */
    });
  }
  
  onSendClick(): void {
    this.messages.push({
      "username": "john.hanios@gmail.com",
      "message": this.messageInput,
    })
    this.scrollToBottom();
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
  deleteMessage(index: number): void {
    this.service.deleteMessage(index);
    this.cdr.detectChanges();
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
