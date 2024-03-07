import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ForumCommentApiService } from '../../services/api/forum-comment-api.service';
import { ForumCommentModel } from '../../services/api/models/forum-comment-model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
   
  constructor(
    private commentApiService: ForumCommentApiService,
    private activatedRouter: ActivatedRoute,
  ) {}

  comments: Array<any> = [];
  
  paramPostId: any;

  inputComment: string = '';

  ngOnInit() {
    this.getAllCommitsByPostId();
  }
  onSendClick() {
    const newComment: ForumCommentModel = {
      postId: this.paramPostId,
      userId: 252,
      comment: this.inputComment
    }
    this.commentApiService.createComment(newComment)
    .subscribe({
      next: (res) => {
        this.comments.push(res);
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
    this.commentApiService.getAllComentsByPostId(this.paramPostId).subscribe({
      next: (res) => {
        this.comments = res;
      }
    });
  } 
}
