import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css'
})
export class CommentItemComponent {

  constructor () {}

  @Input()
  commentItemData: any = {};

  @Output()
  deleteCommit: EventEmitter<number> = new EventEmitter<number>(); 
  onDeleteCommit(): void {
    this.deleteCommit.emit(this.commentItemData.commentId);
  };
  
}
