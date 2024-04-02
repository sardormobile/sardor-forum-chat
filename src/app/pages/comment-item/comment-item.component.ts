import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../enums/roles.enum';
import { LOCAL_STORAGE_USER_DATA_KEY } from '../../constants';
import { UserDataModel } from '../../services/api/models/user-data-model';

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
  userData:UserDataModel = {};
  
  currentRole: Role = Role.ADMIN

  ngOnInit() {
    console.log("coment item commentItemData: " + this.commentItemData.role);
  }


  @Output()
  deleteCommit: EventEmitter<number> = new EventEmitter<number>(); 
  onDeleteCommit(): void {
    this.deleteCommit.emit(this.commentItemData.commentId);
    console.log(this.userData.userId);
  };
  
}
