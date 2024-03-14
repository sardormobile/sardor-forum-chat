import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../enums/roles.enum';
import { UserDataModel } from '../../services/api/models/user-data-model';
@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.css'
})
export class ChatItemComponent {
  
 
  @Input()
  itemData: any = {};
  
  @Input()
  userId: any = null;
  
  @Input()
  userRole: any = null;

  currentRole: boolean = false;
  

  ngOnInit() {
    //console.log("chat item userRole: " + this.userRole);
    this.currentRole = this.userRole === Role.ADMIN;
    //console.log("chat item currentRole: " + this.currentRole);
  }
  @Output()
  deleteChat: EventEmitter<number> = new EventEmitter<number>(); 
  onDeleteChat(): void {
    this.deleteChat.emit(this.itemData.postId);
  }

  @Output()
  openComment: EventEmitter<{postId: number, postMessage: string}> = new EventEmitter<{postId: number, postMessage: string}>();
  onOpenCommentClick(): void {
    this.openComment.emit({postId: this.itemData.postId, postMessage: this.itemData.message});
  }
  
}
