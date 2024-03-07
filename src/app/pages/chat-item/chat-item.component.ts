import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.css'
})
export class ChatItemComponent {

  @Input()
  itemData: any = {};

  @Output()
  deleteChat: EventEmitter<number> = new EventEmitter<number>(); 
  onDeleteChat(): void {
    this.deleteChat.emit(this.itemData.postId);
  }

  @Output()
  openComment: EventEmitter<number> = new EventEmitter<number>();
  onOpenCommentClick(): void {
    this.openComment.emit(this.itemData.postId);
  }
  
}
