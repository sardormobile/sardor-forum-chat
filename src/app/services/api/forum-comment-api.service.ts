import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForumCommentModel } from './models/forum-comment-model';

import { CREATE_COMMENT_URL, DELETE_COMMENT_URL, ALL_COMMENTS_BY_ID_URL} from '../../constants';
@Injectable({
  providedIn: 'root'
})
export class ForumCommentApiService {

  constructor(
    private http: HttpClient
  ) { }

  createComment(comment: ForumCommentModel) {
    return this.http.post(CREATE_COMMENT_URL, comment);
  }

  deleteComentById(commentId: Number) {
    return this.http.delete(`${DELETE_COMMENT_URL}/${commentId}`);
  }

  getAllComentsByPostId(postId: any) {
    return this.http.get<Array<ForumCommentModel>>(`${ALL_COMMENTS_BY_ID_URL}/${postId}/all`);
  }
}
