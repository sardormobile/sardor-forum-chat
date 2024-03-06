import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.css'
})
export class ChatItemComponent {

  @Input()
  itemData: any = {};
  @Input()
  postId: number = -1;

  @Output()
  deleteChat: EventEmitter<number> = new EventEmitter<number>(); 
  
  onDeleteChat(): void {
    this.deleteChat.emit(this.postId);
  }
}
