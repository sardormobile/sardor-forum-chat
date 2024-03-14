import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../enums/roles.enum';
import { LOCAL_STORAGE_USER_ID_KEY } from '../../constants';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css'
})
export class CommentItemComponent {

  constructor () {}//

  @Input()
  commentItemData: any = {};
  
  @Input()
  userId:any = null;
  
  @Input()
  userRole:any = null;

  ngOnInit() {
    console.log("coment item userId: " + this.userId);
    console.log("coment item userRole: " + this.userRole);
  }


  currentRole: Role = Role.ADMIN

  @Output()
  deleteCommit: EventEmitter<number> = new EventEmitter<number>(); 
  onDeleteCommit(): void {
    this.deleteCommit.emit(this.commentItemData.commentId);
    console.log(this.userId);
  };
  
}
