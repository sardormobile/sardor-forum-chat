import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumCommentApiService } from '../../services/api/forum-comment-api.service';
import { ForumCommentModel } from '../../services/api/models/forum-comment-model';
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_USER_DATA_KEY } from '../../constants';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { RegisterApiService } from '../../services/api/register-api.service';
import { Location } from '@angular/common';
import { log } from 'console';
import { UserDataModel } from '../../services/api/models/user-data-model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
   
  constructor(
    private commentApiService: ForumCommentApiService,
    private activatedRouter: ActivatedRoute,
    private registerService: RegisterApiService,
    private jwtDecodeToken: JwtDecoderService,
    private location: Location
  ) {}

  comments: Array<any> = [];

  paramPostId: any;

  queryParam: string = ''
  
  userData: UserDataModel = {};

  inputComment: string = '';

  input_container: boolean = false;

  decodetToken: any;

  ngOnInit() {
    this.getAllCommitsByPostId();
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY);

      const userDataString  = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
      if (userDataString !== null) {
        const userData: UserDataModel = JSON.parse(userDataString);
        this.userData = userData
      }
      if (token) {
        this.decodetToken = this.jwtDecodeToken.decodeToken(token);
        this.input_container = true;
      } else {
        this.input_container = false;
      }
    }
    if (this.decodetToken.username) {
      this.registerService.getUserByUsername(this.decodetToken.username)
      .subscribe({
        next: (res) => {
          if(res.username && res.userId && res.firstName) {
            this.userData.userId = res.userId;
          }
        }
      });
    }
  }
  
  goBack(): void {
    this.location.back();
  }
  
  onSendClick() {
    const newComment: ForumCommentModel = {
      postId: this.paramPostId,
      userId: this.userData.userId,
      message: this.inputComment
    }
    this.commentApiService.createComment(newComment)
    .subscribe({
      next: (res) => {
        this.comments.push(res);
        this.getAllCommitsByPostId();
        this.inputComment = '';
      }
    })
  }
  onDeleteCommit(commentId: number) {
    this.commentApiService.deleteComentById(commentId)
    .subscribe({
      next: () => {
        this.getAllCommitsByPostId();
      }
    });
  }
  
  getAllCommitsByPostId() {
    this.paramPostId = this.activatedRouter.snapshot.params['postId'];
    this.queryParam = this.activatedRouter.snapshot.queryParams['postMsg'];
    this.commentApiService.getAllComentsByPostId(this.paramPostId).subscribe({
      next: (res) => {
        this.comments = res;
      }
    });
  } 
}
