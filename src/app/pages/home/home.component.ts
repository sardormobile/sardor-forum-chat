import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  messageInput: string = '';

  messages: Array<any> = [];
  onSendClick(): void {
    this.messages.push({
      "username": "john.hanios@gmail.com",
      "message": this.messageInput,
    })
    console.log(this.messageInput);
  }
  //keyboard click listener
  onEnterKeyPressed() {
    this.messages.push({
      "username": "john.hanios@gmail.com",
      "message": this.messageInput,
    })
    console.log(this.messageInput);
  }
  //delete message
  deleteMessage(index: number): void {
    this.messages.splice(index, 1);
  }
   
}
